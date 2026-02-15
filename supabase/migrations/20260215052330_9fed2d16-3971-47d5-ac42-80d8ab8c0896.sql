
-- Table for private supplier info (admin-only access)
CREATE TABLE public.opportunity_supplier_info (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  opportunity_id UUID NOT NULL REFERENCES public.opportunities(id) ON DELETE CASCADE,
  alibaba_link TEXT,
  supplier_price TEXT,
  supplier_moq TEXT,
  supplier_delivery_time TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(opportunity_id)
);

-- Enable RLS
ALTER TABLE public.opportunity_supplier_info ENABLE ROW LEVEL SECURITY;

-- Only admins can view and manage supplier info
CREATE POLICY "Only admins can view supplier info"
ON public.opportunity_supplier_info
FOR SELECT
USING (public.is_admin(auth.uid()));

CREATE POLICY "Only admins can manage supplier info"
ON public.opportunity_supplier_info
FOR ALL
USING (public.is_admin(auth.uid()));

-- Trigger for updated_at
CREATE TRIGGER update_opportunity_supplier_info_updated_at
BEFORE UPDATE ON public.opportunity_supplier_info
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
