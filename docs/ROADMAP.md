# Roadmap

Rill is an open-source, self-hosted project management platform. Our goal is to give teams a real alternative to tools
like Asana, Monday.com, and ClickUp — one where you own your data, pay nothing per seat, and can shape the tool to fit
how you actually work.

This document outlines where we're headed. It's organized by theme, not strict timeline — community interest and
contributions will influence what gets built first.

---

## Today

Rill currently supports Kanban boards with drag-and-drop, task management (due dates, checklists, comments, labels,
assignments), a personal "My Tasks" view, team and project organization with role-based access, real-time notifications,
and user management with invitations.

It's a solid foundation. Everything below is about turning it into something you'd choose over a paid SaaS tool.

---

## Multiple Ways to View Your Work

The Kanban board is just one way to look at a project. We're adding the views that business teams want:

- **List view** for sorting and scanning large sets of tasks
- **Calendar view** for planning around deadlines
- **Timeline / Gantt view** for visualizing schedules, durations, and overlaps across a project
- **Table view** for spreadsheet-style editing when you need to update many tasks at once

Each project will let you switch between views with a single click.

---

## Richer Task Management

Tasks need to handle more than they do today. We're building toward:

- **Subtasks** so work can be broken into smaller, assignable pieces
- **Priorities** (urgent, high, medium, low) for clearer decision-making
- **Custom fields** — dropdowns, numbers, dates, currency, checkboxes — so you can track what matters to your team
  without workarounds
- **Custom statuses** that match your actual workflow (e.g., Briefing → In Review → Approved → Published)
- **Recurring tasks** that automatically repeat on a schedule
- **Dependencies** so teams can see what's blocked and what to work on next
- **Templates** for tasks and entire projects, so you're not rebuilding the same structure every time

---

## Documents & Knowledge Base

Project context shouldn't live in a separate tool. We're adding:

- A **rich document editor** for meeting notes, project briefs, SOPs, and anything else your team writes
- **Real-time co-editing** so multiple people can work on the same page
- **Documents linked to projects and tasks** so context stays where the work is
- A **wiki / knowledge base** for team-wide documentation that persists beyond any single project

---

## Guest Access & Client Collaboration

Many teams work with people outside their organization — clients, vendors, freelancers. We're building:

- **Guest roles** with scoped permissions so external people see only what you want them to
- A **client portal view** — a simplified interface for stakeholders to check progress and give feedback
- **Approval workflows** so clients can formally sign off on deliverables
- **Visual proofing** — annotate images and PDFs directly within tasks

---

## Dashboards & Reporting

Managers and leadership need visibility without digging through individual tasks. We're adding:

- **Custom dashboards** you can build with drag-and-drop widgets
- **Project progress**, **team workload**, and **task completion trend** widgets
- **Overdue and at-risk reporting** so nothing falls through the cracks
- **Exportable reports** (PDF, CSV) for sharing with stakeholders who don't log into Rill

---

## Goals & Portfolio Management

For organizations managing many projects, we're building the layer above individual projects:

- **Goals and OKRs** that connect high-level objectives to the projects and tasks that deliver them
- **Portfolio view** — see all your projects at a glance with status, owner, and health
- **Project status updates** — periodic check-ins (on track / at risk / off track) that roll up to leadership
- **Cross-project timelines** so you can see how work across the organization fits together
- **Resource allocation** — understand who is working on what and where there's capacity

---

## Automations

Repetitive manual work slows teams down. We're adding a no-code automation system:

- **When / Then rules** — "When a task moves to Done, notify the project owner" or "When a due date passes, escalate to
  the manager"
- **Multi-step automations** for more complex workflows
- **Pre-built templates** for common patterns so you don't have to start from scratch
- **SLA tracking** — set time limits on how long work can sit in a stage before it gets escalated

---

## Forms & Work Intake

Teams need a structured way to collect requests. We're adding:

- **Custom forms** that automatically create tasks when submitted
- **Public forms** you can share externally for client requests, bug reports, or event RSVPs
- **Conditional logic** so forms adapt based on answers
- **An intake queue** where submissions land for triage before entering a project

---

## Integrations

Rill should work with the tools your team already uses:

- **Slack** and **Microsoft Teams** — receive updates and create tasks without leaving your messaging tool
- **Google Workspace** and **Microsoft 365** — calendar sync and file linking
- **Zapier / Make** — connect Rill to thousands of other apps without writing code
- **Webhooks and API** — for teams that want to build their own integrations
- **Import tools** — migrate from Trello, Asana, Monday.com, or CSV

---

## Time Tracking & Resource Planning

For teams that bill clients or need to manage capacity:

- **Built-in time tracking** with start/stop timers and manual entries
- **Timesheets** with approval workflows
- **Billable vs. non-billable** tagging for client work
- **Workload and capacity views** so managers can see who's overloaded and where there's room
- **Budget vs. actual** tracking at the project level

---

## AI — Private by Default

AI can take real work off people's plates, but most PM tools send your data to third-party cloud services.

- **Self-hosted AI** via Ollama or similar local model runners — your data stays on your servers
- **Cloud AI** as an opt-in alternative for teams that prefer it
- **Practical features first:** turn meeting notes into tasks, summarize long comment threads, draft status updates,
  detect risks and bottlenecks
- **AI agents** that handle recurring work like triaging incoming requests, generating weekly reports, and suggesting
  task breakdowns

---

## Enterprise & Security

For organizations with compliance and security requirements:

- **SSO / SAML** (Okta, Azure AD, Google Workspace)
- **Two-factor authentication**
- **Audit logs** — full record of who did what, when
- **Custom branding and white-labeling** — for agencies and MSPs who want to offer Rill under their own brand
- **Data retention policies** and **IP allowlisting**

---

## Mobile

- **Progressive Web App** so Rill works on phones and tablets with an app-like experience
- **Push notifications** for assignments, mentions, and due dates
- **Full responsive design** — not a stripped-down mobile version

---

## Why Open Source Matters Here

Every feature above is something you can get from a SaaS tool — for $10-30 per user per month. Rill's value is
different:

|                    | SaaS PM Tools                   | Rill                          |
|--------------------|---------------------------------|-------------------------------|
| **Data**           | On their servers                | On yours                      |
| **Pricing**        | Per seat, adds up fast          | Free, unlimited users         |
| **AI**             | Your data sent to third parties | Runs on your infrastructure   |
| **Customization**  | What they give you              | Change anything               |
| **Vendor lock-in** | Switching is painful            | Full data export, open source |
| **Branding**       | Their logo, their domain        | Your logo, your domain        |
