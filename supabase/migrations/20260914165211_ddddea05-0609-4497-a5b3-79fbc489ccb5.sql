CREATE POLICY "Servicos internos gerenciam contatos"
ON public.contatos_site
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);