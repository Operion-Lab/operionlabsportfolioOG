"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { FormStatus, inputClasses } from "@/components/forms/contact-form";
import { Button } from "@/components/ui/button";
import { demoSchema, type DemoInput } from "@/lib/validations";

type Status = { type: "idle" | "success" | "error"; message: string };

export function DemoForm() {
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DemoInput>({
    resolver: zodResolver(demoSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      companyName: "",
      product: "FieldOps SaaS",
      notes: "",
      website: "",
    },
  });

  async function onSubmit(values: DemoInput) {
    setStatus({ type: "idle", message: "" });
    const response = await fetch("/api/demo", {
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
      setStatus({
        type: "error",
        message: body.error || "Unable to request demo. Please call or email Operion Labs.",
      });
      return;
    }

    reset();
    setStatus({ type: "success", message: "Demo request sent. Operion Labs will contact you." });
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <input aria-hidden className="hidden" tabIndex={-1} {...register("website")} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" error={errors.name?.message}>
          <input className={inputClasses} {...register("name")} autoComplete="name" />
        </Field>
        <Field label="Email" error={errors.email?.message}>
          <input className={inputClasses} {...register("email")} autoComplete="email" type="email" />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Phone" error={errors.phone?.message}>
          <input className={inputClasses} {...register("phone")} autoComplete="tel" />
        </Field>
        <Field label="Company" error={errors.companyName?.message}>
          <input className={inputClasses} {...register("companyName")} />
        </Field>
      </div>
      <Field label="Notes" error={errors.notes?.message}>
        <textarea className={`${inputClasses} min-h-32 resize-y`} {...register("notes")} />
      </Field>
      <Button disabled={isSubmitting} type="submit" variant="secondary">
        {isSubmitting ? <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> : <Send aria-hidden size={16} />}
        Request FieldOps Demo
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
