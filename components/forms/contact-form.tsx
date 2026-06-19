"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { contactSchema, type ContactInput } from "@/lib/validations";

type Status = { type: "idle" | "success" | "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      website: "",
    },
  });

  async function onSubmit(values: ContactInput) {
    setStatus({ type: "idle", message: "" });
    const response = await fetch("/api/contact", {
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
      setStatus({
        type: "error",
        message: body.error || "Unable to send message. Please call or email Kriovya Labs.",
      });
      return;
    }

    reset();
    setStatus({ type: "success", message: "Message sent. Kriovya Labs will respond soon." });
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <input aria-hidden className="hidden" tabIndex={-1} {...register("website")} />
      <Field label="Name" error={errors.name?.message}>
        <input className={inputClasses} {...register("name")} autoComplete="name" />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Email" error={errors.email?.message}>
          <input className={inputClasses} {...register("email")} autoComplete="email" type="email" />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input className={inputClasses} {...register("phone")} autoComplete="tel" />
        </Field>
      </div>
      <Field label="Message" error={errors.message?.message}>
        <textarea className={`${inputClasses} min-h-36 resize-y`} {...register("message")} />
      </Field>
      <Button disabled={isSubmitting} type="submit" variant="secondary">
        {isSubmitting ? <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> : <Send aria-hidden size={16} />}
        Send Message
      </Button>
      <FormStatus status={status} />
    </form>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium text-[var(--brand-ink)]">
      <span>{label}</span>
      {children}
      {error ? <span className="text-sm font-normal text-red-700">{error}</span> : null}
    </label>
  );
}

export function FormStatus({ status }: { status: Status }) {
  if (status.type === "idle") {
    return null;
  }

  return (
    <p
      className={`rounded-md px-3 py-2 text-sm ${
        status.type === "success"
          ? "bg-[var(--brand-green-soft)] text-[#184e14]"
          : "bg-red-50 text-red-800"
      }`}
      role="status"
    >
      {status.message}
    </p>
  );
}

export const inputClasses =
  "w-full rounded-md border border-[var(--border)] bg-white px-3 py-3 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-[var(--brand-blue)] focus:ring-4 focus:ring-[#dfe9ff]";
