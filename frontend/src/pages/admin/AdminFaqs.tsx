import { useState } from "react";
import { Plus, Trash2, Edit2, Loader2, HelpCircle } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAdminFaqs } from "@/hooks/useCms";

interface FaqItem {
  id: string;
  category: "About" | "Support" | "Accountability" | "Contact" | string;
  question: string;
  answer: string;
  displayOrder?: number;
  display_order?: number;
  isActive?: boolean;
  is_active?: boolean;
}

export default function AdminFaqs() {
  const { data: faqsData, isLoading, save, remove } = useAdminFaqs();
  const faqs = (faqsData || []) as FaqItem[];

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<FaqItem | null>(null);

  // Form State
  const [categoryInput, setCategoryInput] = useState<string>("About");
  const [questionInput, setQuestionInput] = useState("");
  const [answerInput, setAnswerInput] = useState("");
  const [displayOrderInput, setDisplayOrderInput] = useState<number>(0);
  const [isActiveInput, setIsActiveInput] = useState<boolean>(true);

  function resetForm() {
    setEditingItem(null);
    setCategoryInput("About");
    setQuestionInput("");
    setAnswerInput("");
    setDisplayOrderInput(0);
    setIsActiveInput(true);
  }

  function handleOpenCreate() {
    resetForm();
    setIsDialogOpen(true);
  }

  function handleOpenEdit(item: FaqItem) {
    setEditingItem(item);
    setCategoryInput(item.category || "About");
    setQuestionInput(item.question || "");
    setAnswerInput(item.answer || "");
    setDisplayOrderInput(item.displayOrder ?? item.display_order ?? 0);
    setIsActiveInput(item.isActive ?? item.is_active ?? true);
    setIsDialogOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!questionInput.trim() || !answerInput.trim()) return;

    await save.mutateAsync({
      id: editingItem?.id,
      values: {
        category: categoryInput,
        question: questionInput.trim(),
        answer: answerInput.trim(),
        displayOrder: Number(displayOrderInput) || 0,
        isActive: isActiveInput,
      },
    });

    setIsDialogOpen(false);
    resetForm();
  }

  async function handleDelete(item: FaqItem) {
    if (!confirm(`Delete question "${item.question}"?`)) return;
    remove.mutate(item.id);
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Frequently Asked Questions</h1>
            <p className="text-muted-foreground mt-1">
              Manage public FAQ items by topic category
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button onClick={handleOpenCreate}>
                <Plus className="mr-2 h-4 w-4" />
                Add Question
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <form onSubmit={handleSubmit} className="space-y-4 py-2">
                <DialogHeader>
                  <DialogTitle>{editingItem ? "Edit FAQ Item" : "Add New FAQ Item"}</DialogTitle>
                  <DialogDescription>
                    Provide clear answers for partners, donors, and participants.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={categoryInput} onValueChange={setCategoryInput}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select topic category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="About">About</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                      <SelectItem value="Accountability">Accountability</SelectItem>
                      <SelectItem value="Contact">Contact</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="question">Question *</Label>
                  <Input
                    id="question"
                    required
                    placeholder="e.g. Is my contribution tax-deductible?"
                    value={questionInput}
                    onChange={(e) => setQuestionInput(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="answer">Answer *</Label>
                  <Textarea
                    id="answer"
                    required
                    rows={4}
                    placeholder="Detailed response..."
                    value={answerInput}
                    onChange={(e) => setAnswerInput(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="space-y-2">
                    <Label htmlFor="displayOrder">Display Order</Label>
                    <Input
                      id="displayOrder"
                      type="number"
                      value={displayOrderInput}
                      onChange={(e) => setDisplayOrderInput(Number(e.target.value))}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t sm:border-t-0 sm:pt-4">
                    <Label htmlFor="isActive" className="cursor-pointer font-medium">Active / Visible</Label>
                    <Switch
                      id="isActive"
                      checked={isActiveInput}
                      onCheckedChange={setIsActiveInput}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={save.isPending}>
                    {save.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {editingItem ? "Update FAQ" : "Save FAQ"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* FAQs List */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : faqs.length === 0 ? (
          <Card className="p-8 text-center">
            <HelpCircle className="h-12 w-12 mx-auto text-muted-foreground/50 mb-3" />
            <p className="font-semibold text-lg">No FAQ items created yet</p>
            <p className="text-sm text-muted-foreground mt-1">
              Click &quot;Add Question&quot; above to create your first item.
            </p>
          </Card>
        ) : (
          <div className="space-y-3">
            {faqs.map((item) => (
              <Card key={item.id} className="overflow-hidden group hover:shadow-sm transition">
                <CardContent className="p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-semibold text-xs">
                        {item.category}
                      </Badge>
                      {!(item.isActive ?? item.is_active ?? true) && (
                        <Badge variant="destructive" className="text-xs">Hidden</Badge>
                      )}
                      <span className="text-xs text-muted-foreground font-mono">
                        Order: {item.displayOrder ?? item.display_order ?? 0}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-foreground leading-snug">{item.question}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.answer}</p>
                  </div>

                  <div className="flex sm:flex-col gap-2 shrink-0 pt-2 sm:pt-0">
                    <Button variant="outline" size="sm" onClick={() => handleOpenEdit(item)}>
                      <Edit2 className="h-3.5 w-3.5 mr-1" /> Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => handleDelete(item)}>
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
