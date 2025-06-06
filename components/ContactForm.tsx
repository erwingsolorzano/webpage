"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
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
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  message: z.string().min(10, "Message must be at least 10 characters"),
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
      toast.error("Please wait before sending another message.");
      return;
    }
    setIsSubmitting(true);
    setCooldown(true);
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_SERVICE_ID!,
        process.env.NEXT_PUBLIC_TEMPLATE_ID!,
        values,
        process.env.NEXT_PUBLIC_USER_ID!
      );
      toast.success("Message sent successfully");
      form.reset();
    } catch (error) {
      toast.error("There was an error sending the message");
    }
    setIsSubmitting(false);
    setTimeout(() => setCooldown(false), 60000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="bg-white/5 backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white font-medium">Name</FormLabel>
                <FormControl>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Input
                      placeholder="Your name"
                      {...field}
                      className={`bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:bg-white/10 transition-all duration-300 ${
                        errors.name ? "border-red-400" : ""
                      }`}
                    />
                  </motion.div>
                </FormControl>
                <FormMessage className="text-red-400 text-sm">
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
                <FormLabel className="text-white font-medium">Email</FormLabel>
                <FormControl>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Input
                      placeholder="your.email@example.com"
                      type="email"
                      {...field}
                      className={`bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:bg-white/10 transition-all duration-300 ${
                        errors.email ? "border-red-400" : ""
                      }`}
                    />
                  </motion.div>
                </FormControl>
                <FormMessage className="text-red-400 text-sm">
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
                <FormLabel className="text-white font-medium">Message</FormLabel>
                <FormControl>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Textarea
                      placeholder="Your message..."
                      {...field}
                      className={`min-h-[120px] bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-white/40 focus:bg-white/10 transition-all duration-300 resize-none ${
                        errors.message ? "border-red-400" : ""
                      }`}
                    />
                  </motion.div>
                </FormControl>
                <FormMessage className="text-red-400 text-sm">
                  {errors.message?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              type="submit"
              disabled={isSubmitting}
              className={`relative overflow-hidden w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 py-3 text-lg font-medium transition-all duration-300 ${
                isSubmitting ? "opacity-80" : ""
              }`}
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              
              <span className="relative flex items-center justify-center gap-3">
                <Send className="h-5 w-5" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </span>
              
              {isSubmitting && (
                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-white/40"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 2,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}      
                />
              )}
            </Button>
          </motion.div>
        </form>
      </Form>
    </motion.div>
  );
}