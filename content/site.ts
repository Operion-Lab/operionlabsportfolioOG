import {
  Bot,
  Boxes,
  Building2,
  CheckCircle2,
  Cloud,
  Code2,
  Database,
  Gauge,
  Headphones,
  LayoutDashboard,
  LockKeyhole,
  Mail,
  MapPinned,
  MessageCircle,
  MonitorSmartphone,
  Phone,
  Rocket,
  ServerCog,
  ShieldCheck,
  Smartphone,
  Wrench,
} from "lucide-react";

export const phoneContacts = [
  { raw: "9494518603", display: "+91 94945 18603", whatsapp: true },
  { raw: "8499029804", display: "+91 84990 29804", whatsapp: false },
] as const;

const whatsappContact = phoneContacts.find((contact) => contact.whatsapp) ?? phoneContacts[0];

export const siteConfig = {
  name: "Kriovya Labs",
  tagline: "Ideas into working systems.",
  domain: "kriovyalabs.in",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://kriovyalabs.in",
  email: "kriovyalabs@gmail.com",
  phone: phoneContacts[0].raw,
  phoneDisplay: phoneContacts[0].display,
  phones: phoneContacts,
  whatsappUrl: `https://wa.me/${whatsappContact.raw}`,
  description:
    "Kriovya Labs builds websites, mobile apps, SaaS platforms, admin dashboards, AI chatbots and business software for real-world operations.",
};

export const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/fieldops-saas", label: "FieldOps SaaS" },
  { href: "/products", label: "Products" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/contact", label: "Contact" },
];

export const homeHeroTags = [
  "Secure lead capture",
  "FieldOps SaaS demo",
  "Controlled AI assistant",
  "Deployment handover",
  "Production-ready forms",
];

export const homeHeroSignals = [
  {
    title: "Clear scope before build",
    description:
      "Requirements, milestones and handover checks are defined before development work starts.",
  },
  {
    title: "Production-minded forms",
    description:
      "Quote, contact and demo flows already use validation, rate limits and server-side handling.",
  },
  {
    title: "Workflow-led product thinking",
    description:
      "FieldOps and the other demos show how actual operations translate into usable software.",
  },
  {
    title: "Deployment is part of delivery",
    description:
      "Domain mapping, environment setup, launch checks and post-launch support stay in scope.",
  },
];

export const serviceAreas = [
  {
    title: "Websites",
    description:
      "Fast marketing sites, portfolio websites and conversion-focused landing pages with SEO foundations.",
    icon: MonitorSmartphone,
  },
  {
    title: "Mobile Apps",
    description:
      "Android and cross-platform apps for field teams, customers, bookings and internal workflows.",
    icon: Smartphone,
  },
  {
    title: "Custom Software",
    description:
      "Business web apps, portals and workflow tools built around your operating process.",
    icon: Code2,
  },
  {
    title: "Admin Panels",
    description:
      "Role-based dashboards for teams to manage tasks, leads, approvals, records and reports.",
    icon: LayoutDashboard,
  },
  {
    title: "Backend and APIs",
    description:
      "Secure API routes, integrations, automation and server-side form handling without exposing keys.",
    icon: ServerCog,
  },
  {
    title: "AI Chatbots",
    description:
      "Controlled website assistants for FAQs, lead capture, quote guidance and support flows.",
    icon: Bot,
  },
  {
    title: "Cloud and Database",
    description:
      "Database design, storage setup, deployment and monitoring infrastructure for production systems.",
    icon: Database,
  },
  {
    title: "Maintenance",
    description:
      "Bug fixes, small updates, monitoring, backups, dependency updates and launch support.",
    icon: Wrench,
  },
];

export const products = [
  {
    name: "FieldOps SaaS",
    status: "Available demo",
    summary:
      "Cloud platform for tasks, expenses, purchase orders, service calls, documents, reports and field team visibility.",
  },
  {
    name: "School Management",
    status: "Prototype",
    summary:
      "Student records, fees, attendance, staff workflows and parent communication for schools.",
  },
  {
    name: "AI Site Supervisor",
    status: "Internal product demo",
    summary:
      "AI-assisted project updates, issue summaries and site documentation support for operations teams.",
  },
  {
    name: "Local Maid/Helper Platform",
    status: "Prototype",
    summary:
      "Local service discovery, booking, verification and request tracking for domestic helper workflows.",
  },
];

export const processSteps = [
  "Requirement review",
  "Scope and estimate",
  "UI/demo approval",
  "Development sprints",
  "Testing and fixes",
  "Deployment",
  "Handover",
  "Support",
];

export const trustBlocks = [
  {
    title: "Written scope",
    description:
      "Each build starts with a documented scope, milestones and acceptance checks before development begins.",
    icon: CheckCircle2,
  },
  {
    title: "Secure development",
    description:
      "Secrets stay server-side, inputs are validated and public endpoints are rate-limited from day one.",
    icon: ShieldCheck,
  },
  {
    title: "Stage updates",
    description:
      "You review planned screens, working demos and fixes before the final production launch.",
    icon: Gauge,
  },
  {
    title: "Deployment support",
    description:
      "Vercel hosting, domain mapping, SSL, environment variables and launch checks are part of the handover.",
    icon: Cloud,
  },
  {
    title: "Maintenance",
    description:
      "Optional retainers cover bug fixes, monitoring, small improvements and future enhancements.",
    icon: Headphones,
  },
];

export const fieldOpsFeatures = [
  "Role login and admin dashboard",
  "Task assignment and status tracking",
  "Expense approval workflow",
  "Purchase order and document flow",
  "Service calls and notifications",
  "Mobile field screens and reports",
];

export const fieldOpsIndustries = [
  "Field service",
  "HR and admin teams",
  "Sales teams",
  "Inventory teams",
  "Service teams",
  "Construction and civil sites",
];

export const caseStudies = [
  {
    title: "FieldOps operations platform",
    label: "Internal product demo",
    summary:
      "A SaaS-style system for field tasks, approvals, service calls and mobile visibility.",
    result:
      "Demonstrates product engineering, dashboard design and cloud deployment capability.",
  },
  {
    title: "School management workflow",
    label: "Prototype",
    summary:
      "A working concept for attendance, fees, staff records and student communication.",
    result:
      "Shows how traditional school administration can move into structured software workflows.",
  },
  {
    title: "AI website assistant",
    label: "Available demo",
    summary:
      "Controlled chatbot that answers service and FieldOps questions and guides users to a quote form.",
    result:
      "Shows safe AI integration without exposing internal prompts, secrets or private lead data.",
  },
];

export const contactMethods = [
  {
    label: "Call",
    values: siteConfig.phones.map((contact) => ({
      value: contact.display,
      href: `tel:${contact.raw}`,
    })),
    icon: Phone,
  },
  {
    label: "WhatsApp",
    value: whatsappContact.display,
    href: siteConfig.whatsappUrl,
    icon: MessageCircle,
  },
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
  },
  {
    label: "Domain",
    value: siteConfig.domain,
    href: siteConfig.url,
    icon: MapPinned,
  },
];

export const projectTypes = [
  "Website",
  "Mobile App",
  "Web App",
  "SaaS",
  "AI Chatbot",
  "Other",
] as const;

export const budgetRanges = [
  "Below INR 50,000",
  "INR 50,000 - INR 150,000",
  "INR 150,000 - INR 500,000",
  "Above INR 500,000",
  "Need guidance",
];

export const timelineRanges = [
  "Urgent",
  "2 to 4 weeks",
  "1 to 2 months",
  "2 to 4 months",
  "Flexible",
];

export const productIcons = [Boxes, Rocket, LockKeyhole, Building2];
