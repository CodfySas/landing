"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CONTACT, EXTERNAL, SOCIALS } from "@/lib/constants";
import { home } from "@/lib/content";
import { Reveal } from "@/components/shared/motion-section";
import { FacebookIcon, InstagramIcon, TikTokIcon, WhatsAppIcon } from "@/components/shared/brand-icons";

const schema = z.object({
  name: z.string().min(2, "Tu nombre es muy corto."),
  email: z.email("Email inválido."),
  phone: z.string().min(7, "Teléfono inválido."),
  subject: z.string().min(1, "Selecciona un asunto."),
  message: z.string().min(10, "Cuéntanos un poco más (mín. 10 caracteres)."),
});

type FormValues = z.infer<typeof schema>;

export function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", phone: "", subject: "", message: "" },
  });

  const subject = watch("subject");

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true);
    try {
      const response = await fetch(EXTERNAL.formspree, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Network response was not ok");
      toast.success("¡Mensaje enviado!", {
        description: "Gracias por escribirnos. Te respondemos en menos de 24 horas.",
      });
      reset();
    } catch (error) {
      console.error(error);
      toast.error("No pudimos enviar tu mensaje", {
        description: "Inténtalo de nuevo o escríbenos a " + CONTACT.email,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contacto"
      className="relative isolate overflow-hidden bg-white py-24 md:py-32"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-codfy/30 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-codfy">
            {home.contact.eyebrow}
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold leading-tight tracking-tight text-codfy-ink text-balance sm:text-4xl md:text-5xl">
            {home.contact.title}
          </h2>
          <p className="mt-5 text-base text-balance text-neutral-600 md:text-lg">
            {home.contact.description}
          </p>
        </Reveal>

        <div className="mx-auto mt-16 grid max-w-6xl gap-8 lg:grid-cols-5">
          {/* Contact Info */}
          <Reveal as="div" className="lg:col-span-2">
            <div className="relative h-full overflow-hidden rounded-3xl bg-codfy-ink p-8 text-white shadow-xl">
              <div className="absolute inset-0 gradient-mesh-codfy opacity-50" />
              <div className="relative z-10 flex h-full flex-col">
                <h3 className="font-display text-2xl font-bold">Información de contacto</h3>
                <p className="mt-2 text-sm text-white/65">
                  Estamos a un mensaje de empezar a transformar tu negocio.
                </p>

                <ul className="mt-8 space-y-5">
                  <li className="flex items-start gap-4">
                    <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-codfy-light ring-1 ring-white/10">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-white/50">
                        Oficina
                      </div>
                      <div className="text-sm text-white/90">{CONTACT.address}</div>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-codfy-light ring-1 ring-white/10">
                      <Phone className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-white/50">
                        Teléfono
                      </div>
                      <a href={`tel:${CONTACT.phoneRaw}`} className="text-sm text-white/90 hover:text-white">
                        {CONTACT.phone}
                      </a>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-codfy-light ring-1 ring-white/10">
                      <Mail className="h-5 w-5" />
                    </span>
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-white/50">
                        Email
                      </div>
                      <a href={`mailto:${CONTACT.email}`} className="text-sm text-white/90 hover:text-white">
                        {CONTACT.email}
                      </a>
                    </div>
                  </li>
                </ul>

                <div className="mt-auto pt-10">
                  <div className="text-xs font-semibold uppercase tracking-wider text-white/50">
                    Síguenos
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <a
                      href={SOCIALS.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/80 ring-1 ring-white/10 transition-all hover:bg-codfy hover:text-white hover:ring-codfy"
                    >
                      <FacebookIcon className="h-4 w-4" />
                    </a>
                    <a
                      href={SOCIALS.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/80 ring-1 ring-white/10 transition-all hover:bg-codfy hover:text-white hover:ring-codfy"
                    >
                      <InstagramIcon className="h-4 w-4" />
                    </a>
                    <a
                      href={SOCIALS.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/80 ring-1 ring-white/10 transition-all hover:bg-codfy hover:text-white hover:ring-codfy"
                    >
                      <TikTokIcon className="h-4 w-4" />
                    </a>
                    <a
                      href={SOCIALS.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="WhatsApp"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white/80 ring-1 ring-white/10 transition-all hover:bg-codfy hover:text-white hover:ring-codfy"
                    >
                      <WhatsAppIcon className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal as="div" delay={0.1} className="lg:col-span-3">
            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm md:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-neutral-700">
                    Nombre completo
                  </label>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    {...register("name")}
                    aria-invalid={!!errors.name}
                    className="h-11"
                  />
                  {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-neutral-700">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    {...register("email")}
                    aria-invalid={!!errors.email}
                    className="h-11"
                  />
                  {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="phone" className="text-sm font-medium text-neutral-700">
                    Teléfono
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+57 300 000 0000"
                    {...register("phone")}
                    aria-invalid={!!errors.phone}
                    className="h-11"
                  />
                  {errors.phone && <p className="text-xs text-red-500">{errors.phone.message}</p>}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-sm font-medium text-neutral-700">
                    Asunto
                  </label>
                  <Select
                    value={subject ?? ""}
                    onValueChange={(val) => setValue("subject", val ?? "", { shouldValidate: true })}
                  >
                    <SelectTrigger id="subject" className="h-11 w-full">
                      <SelectValue placeholder="Selecciona uno" />
                    </SelectTrigger>
                    <SelectContent>
                      {home.contact.subjects.map((s) => (
                        <SelectItem key={s.value} value={s.value}>
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.subject && (
                    <p className="text-xs text-red-500">{errors.subject.message}</p>
                  )}
                </div>
              </div>

              <div className="mt-5 space-y-1.5">
                <label htmlFor="message" className="text-sm font-medium text-neutral-700">
                  Cuéntanos tu necesidad
                </label>
                <Textarea
                  id="message"
                  rows={5}
                  placeholder="Describe brevemente tu proyecto o consulta..."
                  {...register("message")}
                  aria-invalid={!!errors.message}
                  className="resize-none"
                />
                {errors.message && (
                  <p className="text-xs text-red-500">{errors.message.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={submitting}
                size="lg"
                className="mt-7 h-12 w-full gap-2 bg-codfy text-base font-semibold text-white shadow-glow-codfy hover:bg-codfy-dark sm:w-auto"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Enviar mensaje
                  </>
                )}
              </Button>
            </motion.form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
