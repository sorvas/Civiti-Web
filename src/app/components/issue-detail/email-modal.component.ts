import { Component, inject, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NgZorroModule } from '../../shared/ng-zorro.module';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import * as IssueActions from '../../store/issues/issue.actions';
import { IssueDetailResponse, IssueAuthorityResponse, URGENCY_LEVELS } from '../../types/civica-api.types';
import { CategoryService } from '../../services/category.service';

export interface EmailModalData {
    issue: IssueDetailResponse;
    authorities: IssueAuthorityResponse[];
}

interface EmailTemplate {
    subject: string;
    body: string;
}

@Component({
    selector: 'app-email-modal',
    standalone: true,
    imports: [
        CommonModule,
        NgZorroModule
    ],
    templateUrl: './email-modal.component.html',
    styleUrl: './email-modal.component.scss'
})
export class EmailModalComponent implements OnInit {
    private _store = inject(Store<AppState>);
    private _message = inject(NzMessageService);
    private _modalRef = inject(NzModalRef);
    private _categoryService = inject(CategoryService);

    issue: IssueDetailResponse;
    authorities: IssueAuthorityResponse[];

    emailTemplate: EmailTemplate | null = null;

    // Copy state tracking for button feedback
    copyStates = {
        subject: false,
        body: false
    };

    // Per-authority copy state tracking
    emailCopyStates: boolean[] = [];

    constructor(@Inject(NZ_MODAL_DATA) public data: EmailModalData) {
        this.issue = data.issue;
        this.authorities = data.authorities;
        this.emailCopyStates = new Array(this.authorities.length).fill(false);
    }

    ngOnInit(): void {
        this.generateEmailTemplate();
    }

    /**
     * Generate read-only email template with placeholders for user to fill in their email client
     */
    private generateEmailTemplate(): void {
        if (!this.issue || !this.authorities.length) return;

        const categoryLabel = this._categoryService.getCategoryLabel(this.issue.category);
        const urgencyLabel = URGENCY_LEVELS[this.issue.urgency] || this.issue.urgency;

        const subject = `Problemă urgentă: ${this.issue.title}`;

        // Build location string from available fields
        const locationParts = [this.issue.address];
        if (this.issue.district) locationParts.push(this.issue.district);
        const locationString = locationParts.filter(Boolean).join(', ') || 'Locație nespecificată';

        const body = `Stimată autoritate,

Subsemnatul/a [NUMELE TĂU COMPLET], cu adresa de email [ADRESA TA DE EMAIL], doresc să vă aduc la cunoștință următoarea problemă:

${this.issue.description}

Locație: ${locationString}
Categorie: ${categoryLabel}
Urgență: ${urgencyLabel}

Această problemă afectează comunitatea noastră și necesită o intervenție urgentă din partea dumneavoastră.

Vă mulțumesc pentru atenție și aștept cu interes răspunsul dumneavoastră.

Cu stimă,
[SEMNĂTURA TA]`;

        this.emailTemplate = { subject, body };
    }

    /**
     * Copy specific authority email to clipboard
     */
    copyAuthorityEmail(index: number): void {
        const authority = this.authorities[index];
        if (!authority) return;

        navigator.clipboard.writeText(authority.email).then(() => {
            this._message.success(`Email copiat: ${authority.name}`);
            this.emailCopyStates[index] = true;
            setTimeout(() => {
                this.emailCopyStates[index] = false;
            }, 2000);
        }).catch(() => {
            this._message.error('Nu s-a putut copia în clipboard');
        });
    }

    /**
     * Copy email subject to clipboard
     */
    copySubject(): void {
        if (!this.emailTemplate) return;
        this.copyToClipboard(this.emailTemplate.subject, 'subject');
    }

    /**
     * Copy email body to clipboard
     */
    copyBody(): void {
        if (!this.emailTemplate) return;
        this.copyToClipboard(this.emailTemplate.body, 'body');
    }

    /**
     * Generic copy to clipboard with state feedback
     */
    private copyToClipboard(text: string, type: 'subject' | 'body'): void {
        navigator.clipboard.writeText(text).then(() => {
            this._message.success('Copiat în clipboard!');
            this.copyStates[type] = true;
            setTimeout(() => {
                this.copyStates[type] = false;
            }, 2000);
        }).catch(() => {
            this._message.error('Nu s-a putut copia în clipboard');
        });
    }

    /**
     * Called when user clicks "Am trimis email-ul" to confirm and track
     * Dispatches tracking action for all authorities at once
     */
    confirmEmailSent(): void {
        // Track email sent for each authority
        for (const authority of this.authorities) {
            this._store.dispatch(IssueActions.trackEmailSent({
                issueId: this.issue.id,
                targetAuthority: authority.email
            }));
        }

        this._message.success('Mulțumim pentru contribuție!');
        this._modalRef.close(true);
    }

    /**
     * Close modal without tracking
     */
    onCancel(): void {
        this._modalRef.close(false);
    }
}