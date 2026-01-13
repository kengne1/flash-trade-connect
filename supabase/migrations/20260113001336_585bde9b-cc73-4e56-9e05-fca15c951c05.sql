-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'support');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'support',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(_user_id, 'admin')
$$;

-- RLS policies for user_roles
CREATE POLICY "Admins can view all roles"
ON public.user_roles FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can manage roles"
ON public.user_roles FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

-- Opportunities table
CREATE TABLE public.opportunities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    image_url TEXT,
    moq TEXT NOT NULL DEFAULT '100 unités',
    price_range TEXT NOT NULL,
    transport_mode TEXT NOT NULL DEFAULT 'maritime',
    category TEXT NOT NULL DEFAULT 'Général',
    description TEXT,
    groupage_estimate TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active opportunities"
ON public.opportunities FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins and support can manage opportunities"
ON public.opportunities FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'support'));

-- Promotions table
CREATE TABLE public.promotions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    original_price TEXT,
    promo_price TEXT,
    end_date TIMESTAMP WITH TIME ZONE,
    features TEXT[] DEFAULT '{}',
    display_in_banner BOOLEAN NOT NULL DEFAULT false,
    display_in_page BOOLEAN NOT NULL DEFAULT true,
    is_active BOOLEAN NOT NULL DEFAULT true,
    whatsapp_message TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active promotions"
ON public.promotions FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins and support can manage promotions"
ON public.promotions FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'support'));

-- Formations table
CREATE TABLE public.formations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    program TEXT[] DEFAULT '{}',
    image_url TEXT,
    certificate_images TEXT[] DEFAULT '{}',
    start_date TIMESTAMP WITH TIME ZONE,
    end_date TIMESTAMP WITH TIME ZONE,
    price TEXT,
    location TEXT,
    status TEXT NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'closed', 'coming_soon')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.formations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active formations"
ON public.formations FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins and support can manage formations"
ON public.formations FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'support'));

-- Announcements table
CREATE TABLE public.announcements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    subtitle TEXT,
    image_url TEXT,
    link TEXT NOT NULL DEFAULT '/',
    link_text TEXT NOT NULL DEFAULT 'En savoir plus',
    display_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active announcements"
ON public.announcements FOR SELECT
USING (is_active = true);

CREATE POLICY "Admins and support can manage announcements"
ON public.announcements FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'support'));

-- Site settings table
CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key TEXT UNIQUE NOT NULL,
    value JSONB NOT NULL DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view settings"
ON public.site_settings FOR SELECT
USING (true);

CREATE POLICY "Only admins can update settings"
ON public.site_settings FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

-- Chatbot settings table
CREATE TABLE public.chatbot_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    is_enabled BOOLEAN NOT NULL DEFAULT true,
    welcome_message TEXT NOT NULL DEFAULT 'Bonjour ! Je suis NaYa, votre assistante virtuelle.',
    student_message TEXT,
    merchant_message TEXT,
    entrepreneur_message TEXT,
    groupage_explanation TEXT,
    motivation_message TEXT,
    quote_template TEXT,
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.chatbot_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view chatbot settings"
ON public.chatbot_settings FOR SELECT
USING (true);

CREATE POLICY "Only admins can update chatbot settings"
ON public.chatbot_settings FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

-- Page contents table
CREATE TABLE public.page_contents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    page_slug TEXT UNIQUE NOT NULL,
    title TEXT,
    content JSONB NOT NULL DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.page_contents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view page contents"
ON public.page_contents FOR SELECT
USING (true);

CREATE POLICY "Admins and support can update page contents"
ON public.page_contents FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'support'));

-- Contact info table
CREATE TABLE public.contact_info (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    whatsapp_numbers TEXT[] DEFAULT ARRAY['+237 653 207 472', '+237 657 302 129'],
    phone_numbers TEXT[] DEFAULT ARRAY['+237 653 207 472'],
    location TEXT DEFAULT 'Douala, Cameroun',
    email TEXT DEFAULT 'contact@flashtrade.cm',
    auto_messages JSONB DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_info ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view contact info"
ON public.contact_info FOR SELECT
USING (true);

CREATE POLICY "Only admins can update contact info"
ON public.contact_info FOR ALL
TO authenticated
USING (public.is_admin(auth.uid()));

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_opportunities_updated_at BEFORE UPDATE ON public.opportunities FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_promotions_updated_at BEFORE UPDATE ON public.promotions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_formations_updated_at BEFORE UPDATE ON public.formations FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON public.announcements FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_chatbot_settings_updated_at BEFORE UPDATE ON public.chatbot_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_page_contents_updated_at BEFORE UPDATE ON public.page_contents FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_contact_info_updated_at BEFORE UPDATE ON public.contact_info FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default settings
INSERT INTO public.site_settings (key, value) VALUES 
('company_name', '"Flash Trade International SARL"'),
('legal_mentions', '{"text": ""}'),
('price_disclaimer', '"Les prix affichés sont indicatifs et peuvent varier selon les conditions du marché."'),
('sections_enabled', '{"opportunities": true, "promotions": true, "formations": true, "chatbot": true}');

-- Insert default chatbot settings
INSERT INTO public.chatbot_settings (
    welcome_message,
    student_message,
    merchant_message,
    entrepreneur_message,
    groupage_explanation,
    motivation_message
) VALUES (
    'Bonjour ! Je suis NaYa, votre assistante virtuelle Flash Trade. Comment puis-je vous aider ?',
    'En tant qu''étudiant, vous pouvez bénéficier de nos offres spéciales pour démarrer votre activité d''importation.',
    'Pour les commerçants, nous proposons des solutions de groupage adaptées à vos besoins.',
    'Vous êtes entrepreneur ? Découvrez nos formations complètes sur l''importation.',
    'Le groupage permet de partager les frais de transport entre plusieurs importateurs.',
    'Lancez-vous dans l''importation avec Flash Trade !'
);

-- Insert default contact info
INSERT INTO public.contact_info (whatsapp_numbers, phone_numbers, location, email) VALUES (
    ARRAY['+237 653 207 472', '+237 657 302 129'],
    ARRAY['+237 653 207 472'],
    'Douala, Cameroun',
    'contact@flashtrade.cm'
);