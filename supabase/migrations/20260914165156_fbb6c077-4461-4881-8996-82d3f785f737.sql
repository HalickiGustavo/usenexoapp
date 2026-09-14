CREATE TABLE public.contatos_site (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL CHECK (char_length(nome) BETWEEN 2 AND 100),
  email text NOT NULL CHECK (char_length(email) <= 255),
  whatsapp text NOT NULL CHECK (char_length(whatsapp) BETWEEN 10 AND 20),
  origem text NOT NULL DEFAULT 'pagina_vendas' CHECK (char_length(origem) <= 60),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT ALL ON public.contatos_site TO service_role;

ALTER TABLE public.contatos_site ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_contatos_site_updated_at
BEFORE UPDATE ON public.contatos_site
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

CREATE INDEX contatos_site_created_at_idx ON public.contatos_site (created_at DESC);