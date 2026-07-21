import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const heroSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subtitle: z.string().optional(),
  cta_primary_text: z.string().optional(),
  cta_primary_link: z.string().optional(),
  cta_secondary_text: z.string().optional(),
  cta_secondary_link: z.string().optional(),
  background_image_url: z.string().optional(),
  is_active: z.boolean().default(true),
});

type HeroFormData = z.infer<typeof heroSchema>;

interface HeroContent {
  id: string;
  title: string;
  subtitle: string | null;
  cta_primary_text: string | null;
  cta_primary_link: string | null;
  cta_secondary_text: string | null;
  cta_secondary_link: string | null;
  background_image_url: string | null;
  is_active: boolean | null;
}

export default function AdminHero() {
  const [heroes, setHeroes] = useState<HeroContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingHero, setEditingHero] = useState<HeroContent | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const form = useForm<HeroFormData>({
    resolver: zodResolver(heroSchema),
    defaultValues: {
      title: "",
      subtitle: "",
      cta_primary_text: "",
      cta_primary_link: "",
      cta_secondary_text: "",
      cta_secondary_link: "",
      background_image_url: "",
      is_active: true,
    },
  });

  useEffect(() => {
    fetchHeroes();
  }, []);

  async function fetchHeroes() {
    const { data, error } = await supabase
      .from("hero_content")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      setHeroes(data || []);
    }
    setIsLoading(false);
  }

  function openCreateDialog() {
    setEditingHero(null);
    form.reset({
      title: "",
      subtitle: "",
      cta_primary_text: "",
      cta_primary_link: "",
      cta_secondary_text: "",
      cta_secondary_link: "",
      background_image_url: "",
      is_active: true,
    });
    setIsDialogOpen(true);
  }

  function openEditDialog(hero: HeroContent) {
    setEditingHero(hero);
    form.reset({
      title: hero.title,
      subtitle: hero.subtitle || "",
      cta_primary_text: hero.cta_primary_text || "",
      cta_primary_link: hero.cta_primary_link || "",
      cta_secondary_text: hero.cta_secondary_text || "",
      cta_secondary_link: hero.cta_secondary_link || "",
      background_image_url: hero.background_image_url || "",
      is_active: hero.is_active ?? true,
    });
    setIsDialogOpen(true);
  }

  async function onSubmit(data: HeroFormData) {
    setIsSaving(true);

    if (editingHero) {
      const { error } = await supabase
        .from("hero_content")
        .update(data)
        .eq("id", editingHero.id);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Hero content updated successfully" });
        setIsDialogOpen(false);
        fetchHeroes();
      }
    } else {
      const { error } = await supabase.from("hero_content").insert([{ ...data, title: data.title }]);

      if (error) {
        toast({ title: "Error", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "Success", description: "Hero content created successfully" });
        setIsDialogOpen(false);
        fetchHeroes();
      }
    }

    setIsSaving(false);
  }

  async function deleteHero(id: string) {
    if (!confirm("Are you sure you want to delete this hero content?")) return;

    const { error } = await supabase.from("hero_content").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: "Hero content deleted successfully" });
      fetchHeroes();
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Hero Section</h1>
            <p className="text-muted-foreground mt-1">Manage your homepage hero content</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog}>
                <Plus className="mr-2 h-4 w-4" /> Add Hero Content
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingHero ? "Edit" : "Create"} Hero Content</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter hero title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="subtitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subtitle</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Enter subtitle" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="cta_primary_text"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary CTA Text</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Get Started" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cta_primary_link"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary CTA Link</FormLabel>
                          <FormControl>
                            <Input placeholder="/partnership" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="cta_secondary_text"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Secondary CTA Text</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Learn More" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="cta_secondary_link"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Secondary CTA Link</FormLabel>
                          <FormControl>
                            <Input placeholder="/programs" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="background_image_url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Background Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="is_active"
                    render={({ field }) => (
                      <FormItem className="flex items-center gap-2">
                        <FormControl>
                          <Switch checked={field.value} onCheckedChange={field.onChange} />
                        </FormControl>
                        <FormLabel className="!mt-0">Active</FormLabel>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full" disabled={isSaving}>
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {editingHero ? "Update" : "Create"}
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : heroes.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No hero content yet. Click "Add Hero Content" to create one.
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {heroes.map((hero) => (
              <Card key={hero.id}>
                <CardHeader className="flex flex-row items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{hero.title}</CardTitle>
                    {hero.subtitle && (
                      <p className="text-sm text-muted-foreground mt-1">{hero.subtitle}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <span className={`text-xs px-2 py-1 rounded ${hero.is_active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {hero.is_active ? "Active" : "Inactive"}
                    </span>
                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(hero)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteHero(hero.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
