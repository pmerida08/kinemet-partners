/// <reference types="vite/client" />
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Estado =
  | "Nuevo"
  | "Confirmado"
  | "Contactado"
  | "Reunión"
  | "Finalizado";

export type Prioridad = "Alta" | "Media" | "Baja";

export interface Cliente {
  id: string;
  nombre: string;
  empresa: string | null;
  telefono: string | null;
  email: string | null;
  estado: Estado;
  prioridad: Prioridad;
  descripcion: string | null;
  created_at: string;
}
