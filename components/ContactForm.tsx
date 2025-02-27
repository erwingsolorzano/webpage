"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import emailjs from "emailjs-com";

const formSchema = z.object({
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [cooldown, setCooldown] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  const errors = form.formState.errors;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (cooldown) {
      toast.error("Por favor, espera antes de enviar otro mensaje.");
      return;
    }
    setIsSubmitting(true);
    setCooldown(true);
    console.log('🚬 ===> onSubmit ===> process.env.NEXT_PUBLIC_USER_ID:', process.env.NEXT_PUBLIC_USER_ID);
    console.log('🚬 ===> onSubmit ===> process.env.NEXT_PUBLIC_TEMPLATE_ID:', process.env.NEXT_PUBLIC_TEMPLATE_ID);
    console.log('🚬 ===> onSubmit ===> process.env.NEXT_PUBLIC_SERVICE_ID:', process.env.NEXT_PUBLIC_SERVICE_ID);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID!,
        values,
        process.env.NEXT_PUBLIC_USER_ID!
      );
      toast.success("Mensaje enviado correctamente");
      form.reset();
    } catch (error) {
      toast.error("Hubo un error al enviar el mensaje");
    }
    setIsSubmitting(false);
    setTimeout(() => setCooldown(false), 90000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-background p-4 rounded-lg shadow-lg border max-h-[80vh] overflow-y-auto"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Tu nombre"
                    {...field}
                    className={`border-2 p-2 rounded ${
                      errors.name ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm">
                  {errors.name?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="tucorreo@ejemplo.com"
                    type="email"
                    {...field}
                    className={`border-2 p-2 rounded ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm">
                  {errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mensaje</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tu mensaje..."
                    {...field}
                    className={`min-h-[100px] border-2 p-2 rounded ${
                      errors.message ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-sm">
                  {errors.message?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full border-2 hover:bg-primary hover:text-primary-foreground transition-colors"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Enviando..." : "Enviar mensaje"}
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
