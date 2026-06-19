"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  budgetRanges,
  projectTypes,
  timelineRanges,
} from "@/content/site";
import { FormStatus, inputClasses } from "@/components/forms/contact-form";
import { quoteSchema, type QuoteInput } from "@/lib/validations";

type Status = { type: "idle" | "success" | "error"; message: string };

export function QuoteForm() {
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<QuoteInput>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      businessName: "",
      projectType: "Website",
      budgetRange: "",
      timeline: "",
      requirements: "",
      website: "",
    },
  });

  async function onSubmit(values: QuoteInput) {
    setStatus({ type: "idle", message: "" });
    const response = await fetch("/api/quote", {
      body: JSON.stringify(values),
      headers: { "Content-Type": "application/json" },
      method: "POST",
    });
    const body = await response.json().catch(() => ({}));

    if (!response.ok) {
      setStatus({
        type: "error",
        message: body.error || "Unable to submit quote. Please call or email Kriovya Labs.",
      });
      return;
    }

    reset();
    setStatus({ type: "success", message: "Quote request submitted. Kriovya Labs will review it." });
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
        <Field label="Business name" error={errors.businessName?.message}>
          <input className={inputClasses} {...register("businessName")} />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Project type" error={errors.projectType?.message}>
          <select className={inputClasses} {...register("projectType")}>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Budget range" error={errors.budgetRange?.message}>
          <select className={inputClasses} {...register("budgetRange")}>
            <option value="">Select range</option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Timeline" error={errors.timeline?.message}>
          <select className={inputClasses} {...register("timeline")}>
            <option value="">Select timeline</option>
            {timelineRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Requirements" error={errors.requirements?.message}>
        <textarea className={`${inputClasses} min-h-40 resize-y`} {...register("requirements")} />
      </Field>
      <Button disabled={isSubmitting} type="submit" variant="secondary">
        {isSubmitting ? <Loader2 aria-hidden className="h-4 w-4 animate-spin" /> : <Send aria-hidden size={16} />}
        Submit Quote Request
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
