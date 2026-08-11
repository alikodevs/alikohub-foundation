import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Loader2,
  Plus,
  Pencil,
  Trash2,
  MoreVertical,
  Eye,
  User,
  Linkedin,
  Twitter,
  Calendar,
  ExternalLink,
  Users,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Card, CardContent } from "@/components/ui/card";
import { useAdminTeam } from "@/hooks/useCms";
import { MediaPicker, getFullMediaUrl } from "@/components/admin/MediaPicker";

const teamSchema = z.object({
  name: z.string().min(1, "Name is required"),
  role: z.string().optional(),
  bio: z.string().optional(),
  imageUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  twitterUrl: z.string().optional(),
  displayOrder: z.number().default(0),
  isActive: z.boolean().default(true),
});

type TeamFormData = z.infer<typeof teamSchema>;

interface TeamMember {
  id: string;
  name: string;
  role?: string | null;
  bio?: string | null;
  imageUrl?: string | null;
  image_url?: string | null;
  linkedinUrl?: string | null;
  linkedin_url?: string | null;
  twitterUrl?: string | null;
  twitter_url?: string | null;
  displayOrder?: number | null;
  display_order?: number | null;
  isActive?: boolean | null;
  is_active?: boolean | null;
  createdAt?: string;
  created_at?: string;
}

export default function AdminTeam() {
  const { data: membersData, isLoading, save, remove } = useAdminTeam();
  const members = (membersData || []) as TeamMember[];

  // Sidebar / Drawer States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const form = useForm<TeamFormData>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: "",
      role: "",
      bio: "",
      imageUrl: "",
      linkedinUrl: "",
      twitterUrl: "",
      displayOrder: 0,
      isActive: true,
    },
  });

  const { isDirty } = form.formState;

  function openCreateDrawer() {
    setSelectedMember(null);
    setIsEditMode(true);
    form.reset({
      name: "",
      role: "",
      bio: "",
      imageUrl: "",
      linkedinUrl: "",
      twitterUrl: "",
      displayOrder: members.length + 1,
      isActive: true,
    });
    setIsDrawerOpen(true);
  }

  function openViewDrawer(member: TeamMember) {
    setSelectedMember(member);
    setIsEditMode(false);
    setIsDrawerOpen(true);
  }

  function switchToEditMode(member: TeamMember) {
    setSelectedMember(member);
    form.reset({
      name: member.name || "",
      role: member.role || "",
      bio: member.bio || "",
      imageUrl: member.imageUrl || member.image_url || "",
      linkedinUrl: member.linkedinUrl || member.linkedin_url || "",
      twitterUrl: member.twitterUrl || member.twitter_url || "",
      displayOrder: member.displayOrder ?? member.display_order ?? 0,
      isActive: member.isActive ?? member.is_active ?? true,
    });
    setIsEditMode(true);
  }

  async function onSubmit(data: TeamFormData) {
    // Only send request if creating a new member OR if form has actual changes
    if (selectedMember && !isDirty) {
      setIsEditMode(false);
      return;
    }

    const payload = {
      ...data,
      image_url: data.imageUrl,
      linkedin_url: data.linkedinUrl,
      twitter_url: data.twitterUrl,
      display_order: data.displayOrder,
      is_active: data.isActive,
    };

    save.mutate(
      { id: selectedMember?.id, values: payload as unknown as Record<string, unknown> },
      {
        onSuccess: (res) => {
          if (selectedMember && res) {
            const updated = (res.data || res) as TeamMember;
            setSelectedMember({
              ...selectedMember,
              ...data,
              ...(updated || {}),
            });
            setIsEditMode(false);
          } else {
            setIsDrawerOpen(false);
          }
        },
      }
    );
  }

  async function deleteMember(member: TeamMember) {
    if (!confirm(`Are you sure you want to delete "${member.name}"?`)) return;
    remove.mutate(member.id, {
      onSuccess: () => {
        if (selectedMember?.id === member.id) {
          setIsDrawerOpen(false);
        }
      },
    });
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Team Members</h1>
            <p className="text-muted-foreground mt-1">
              Manage team profiles, roles, and public display settings
            </p>
          </div>
          <Button onClick={openCreateDrawer} className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" /> Add Team Member
          </Button>
        </div>

        {/* Responsive Table */}
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            {isLoading ? (
              <div className="flex justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : members.length === 0 ? (
              <div className="py-16 text-center text-muted-foreground flex flex-col items-center gap-2">
                <Users className="h-12 w-12 text-muted-foreground/40" />
                <p className="font-semibold text-foreground">No team members added yet</p>
                <p className="text-sm">Click "Add Team Member" to create your first team profile.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Member</TableHead>
                      <TableHead>Role / Position</TableHead>
                      <TableHead>Links</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="w-[60px] text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {members.map((member) => {
                      const imagePath = member.imageUrl || member.image_url;
                      const avatarUrl = getFullMediaUrl(imagePath);
                      const isActive = member.isActive ?? member.is_active ?? true;
                      const createdDate = member.createdAt || member.created_at;

                      return (
                        <TableRow key={member.id} className="hover:bg-muted/50 transition">
                          {/* Member (Avatar + Name) */}
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full overflow-hidden bg-muted border flex-shrink-0 flex items-center justify-center">
                                {imagePath ? (
                                  <img
                                    src={avatarUrl}
                                    alt={member.name}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                      if (imagePath && e.currentTarget.src !== window.location.origin + imagePath) {
                                        e.currentTarget.src = imagePath;
                                      }
                                    }}
                                  />
                                ) : (
                                  <User className="h-4 w-4 text-muted-foreground" />
                                )}
                              </div>
                              <span className="font-semibold text-foreground truncate max-w-[180px]">
                                {member.name}
                              </span>
                            </div>
                          </TableCell>

                          {/* Role / Position */}
                          <TableCell className="text-muted-foreground">
                            {member.role || "—"}
                          </TableCell>

                          {/* Links / Contact */}
                          <TableCell>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              {member.linkedinUrl || member.linkedin_url ? (
                                <a
                                  href={member.linkedinUrl || member.linkedin_url || "#"}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="hover:text-primary transition"
                                  title="LinkedIn profile"
                                >
                                  <Linkedin className="h-4 w-4" />
                                </a>
                              ) : null}
                              {member.twitterUrl || member.twitter_url ? (
                                <a
                                  href={member.twitterUrl || member.twitter_url || "#"}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="hover:text-primary transition"
                                  title="Twitter/X profile"
                                >
                                  <Twitter className="h-4 w-4" />
                                </a>
                              ) : null}
                              {!member.linkedinUrl && !member.linkedin_url && !member.twitterUrl && !member.twitter_url && (
                                <span className="text-xs text-muted-foreground/60">—</span>
                              )}
                            </div>
                          </TableCell>

                          {/* Status */}
                          <TableCell>
                            <Badge variant={isActive ? "default" : "secondary"}>
                              {isActive ? "Active" : "Inactive"}
                            </Badge>
                          </TableCell>

                          {/* Created/Joined */}
                          <TableCell className="text-xs text-muted-foreground">
                            {createdDate ? new Date(createdDate).toLocaleDateString() : "—"}
                          </TableCell>

                          {/* Actions Three-Dot Menu */}
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                  <MoreVertical className="h-4 w-4" />
                                  <span className="sr-only">Open actions</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="w-36">
                                <DropdownMenuItem onClick={() => openViewDrawer(member)}>
                                  <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() => deleteMember(member)}
                                  className="text-destructive focus:text-destructive"
                                >
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right-Side Details / Edit Drawer (Sheet) */}
        <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
          <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto flex flex-col justify-between">
            <div>
              <SheetHeader className="pb-4 border-b">
                <SheetTitle className="text-xl">
                  {isEditMode
                    ? selectedMember
                      ? "Edit Team Member"
                      : "Add New Team Member"
                    : "Member Profile"}
                </SheetTitle>
                <SheetDescription>
                  {isEditMode
                    ? "Modify details below and click Save Changes to apply."
                    : "Detailed view of the team member profile."}
                </SheetDescription>
              </SheetHeader>

              {/* Drawer Body: View Mode vs Edit Mode */}
              <div className="py-6 space-y-6">
                {!isEditMode && selectedMember ? (
                  /* VIEW MODE */
                  <div className="space-y-6">
                    {/* Header Avatar & Name */}
                    <div className="flex flex-col items-center text-center pb-4 border-b">
                      <div className="w-24 h-24 rounded-full overflow-hidden bg-muted border-2 border-primary/20 shadow-md mb-3 flex items-center justify-center">
                        {selectedMember.imageUrl || selectedMember.image_url ? (
                          <img
                            src={getFullMediaUrl(selectedMember.imageUrl || selectedMember.image_url)}
                            alt={selectedMember.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const raw = selectedMember.imageUrl || selectedMember.image_url;
                              if (raw && e.currentTarget.src !== window.location.origin + raw) {
                                e.currentTarget.src = raw;
                              }
                            }}
                          />
                        ) : (
                          <User className="h-10 w-10 text-muted-foreground" />
                        )}
                      </div>
                      <h2 className="text-xl font-bold text-foreground">{selectedMember.name}</h2>
                      <p className="text-sm text-primary font-medium mt-0.5">
                        {selectedMember.role || "No title assigned"}
                      </p>
                      <div className="mt-2">
                        <Badge variant={selectedMember.isActive ?? selectedMember.is_active ?? true ? "default" : "secondary"}>
                          {selectedMember.isActive ?? selectedMember.is_active ?? true ? "Active Profile" : "Inactive"}
                        </Badge>
                      </div>
                    </div>

                    {/* Biography */}
                    <div className="space-y-1.5">
                      <h4 className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">
                        Biography
                      </h4>
                      <p className="text-sm text-foreground leading-relaxed bg-muted/30 p-3 rounded-lg border">
                        {selectedMember.bio || "No biography provided yet."}
                      </p>
                    </div>

                    {/* Meta Details */}
                    <div className="grid grid-cols-2 gap-4 text-sm pt-2">
                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground block">Display Order</span>
                        <span className="font-semibold font-mono">
                          {selectedMember.displayOrder ?? selectedMember.display_order ?? 0}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-xs text-muted-foreground block flex items-center gap-1">
                          <Calendar className="h-3 w-3 inline" /> Created / Joined
                        </span>
                        <span className="font-medium">
                          {selectedMember.createdAt || selectedMember.created_at
                            ? new Date(selectedMember.createdAt || selectedMember.created_at!).toLocaleDateString()
                            : "—"}
                        </span>
                      </div>
                    </div>

                    {/* Social Profiles */}
                    <div className="space-y-2 pt-2 border-t">
                      <h4 className="text-xs uppercase font-semibold text-muted-foreground tracking-wider">
                        Social Profiles
                      </h4>
                      <div className="flex flex-col gap-2 text-sm">
                        {selectedMember.linkedinUrl || selectedMember.linkedin_url ? (
                          <a
                            href={selectedMember.linkedinUrl || selectedMember.linkedin_url!}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-primary hover:underline"
                          >
                            <Linkedin className="h-4 w-4" />
                            <span>LinkedIn Profile</span>
                            <ExternalLink className="h-3 w-3 ml-auto opacity-60" />
                          </a>
                        ) : (
                          <p className="text-xs text-muted-foreground italic">No LinkedIn profile set</p>
                        )}

                        {selectedMember.twitterUrl || selectedMember.twitter_url ? (
                          <a
                            href={selectedMember.twitterUrl || selectedMember.twitter_url!}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center gap-2 text-primary hover:underline"
                          >
                            <Twitter className="h-4 w-4" />
                            <span>Twitter / X Profile</span>
                            <ExternalLink className="h-3 w-3 ml-auto opacity-60" />
                          </a>
                        ) : (
                          <p className="text-xs text-muted-foreground italic">No Twitter profile set</p>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  /* EDIT / CREATE MODE FORM */
                  <Form {...form}>
                    <form id="drawer-team-form" onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name *</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Jane Doe" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Role / Title</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. Program Lead" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Biography</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Works on community programs..." rows={3} {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Profile Photo (Optional)</FormLabel>
                            <FormControl>
                              <MediaPicker
                                value={field.value}
                                onChange={field.onChange}
                                label="Select Profile Photo"
                                placeholder="Choose an image from Media Library or upload new"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="linkedinUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>LinkedIn URL</FormLabel>
                              <FormControl>
                                <Input placeholder="https://linkedin.com/in/..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="twitterUrl"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Twitter / X URL</FormLabel>
                              <FormControl>
                                <Input placeholder="https://twitter.com/..." {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4 items-center pt-2">
                        <FormField
                          control={form.control}
                          name="displayOrder"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Display Order</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  {...field}
                                  onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="isActive"
                          render={({ field }) => (
                            <FormItem className="flex items-center gap-2 pt-6">
                              <FormControl>
                                <Switch checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <FormLabel className="!mt-0 cursor-pointer">Active</FormLabel>
                            </FormItem>
                          )}
                        />
                      </div>
                    </form>
                  </Form>
                )}
              </div>
            </div>

            {/* Drawer Footer Actions */}
            <div className="pt-4 border-t flex items-center justify-end gap-3 bg-background">
              {!isEditMode && selectedMember ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDrawerOpen(false)}
                  >
                    Close
                  </Button>
                  <Button
                    type="button"
                    onClick={() => switchToEditMode(selectedMember)}
                  >
                    <Pencil className="mr-2 h-4 w-4" /> Edit Profile
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      if (selectedMember) {
                        setIsEditMode(false);
                      } else {
                        setIsDrawerOpen(false);
                      }
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    form="drawer-team-form"
                    disabled={save.isPending || (Boolean(selectedMember) && !isDirty)}
                  >
                    {save.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : selectedMember ? (
                      isDirty ? "Save Changes" : "No Changes"
                    ) : (
                      "Create Member"
                    )}
                  </Button>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </AdminLayout>
  );
}
