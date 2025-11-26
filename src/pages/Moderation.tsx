import { SEO } from "@/components/SEO";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Shield, Trash2, X, AlertTriangle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

interface Report {
  id: string;
  blog_post_id: string;
  reason: string;
  details: string | null;
  status: string;
  created_at: string;
  blog_posts: {
    id: string;
    title: string;
    author_name: string;
    category: string;
  };
}

export default function Moderation() {
  const [adminKey, setAdminKey] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReports = async (key: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/moderate-blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify({ action: 'list_reports', admin_key: key })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Грешка');
      }

      setReports(result.reports || []);
      setIsAuthenticated(true);
      toast.success('Влизане успешно!');
    } catch (error: any) {
      toast.error(error.message);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    fetchReports(adminKey);
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Сигурни ли сте, че искате да изтриете този пост?')) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/moderate-blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify({ action: 'delete_post', post_id: postId, admin_key: adminKey })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Грешка');
      }

      toast.success('Постът е изтрит!');
      fetchReports(adminKey);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDismissReport = async (reportId: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/moderate-blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`
        },
        body: JSON.stringify({ action: 'dismiss_report', report_id: reportId, admin_key: adminKey })
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Грешка');
      }

      toast.success('Докладът е отхвърлен!');
      fetchReports(adminKey);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <SEO
          title="Модерация - Brothers Gym Казанлък"
          description="Панел за модерация на съдържание"
          noindex={true}
        />
        <div className="min-h-screen bg-background py-20 px-4 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-8 h-8 text-primary" />
                <CardTitle className="text-2xl">Модерационен панел</CardTitle>
              </div>
              <CardDescription>Въведете административен ключ</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="admin-key">Административен ключ</Label>
                  <Input
                    id="admin-key"
                    type="password"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    placeholder="Въведете ключ"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Влизане...' : 'Влез'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Модерация - Brothers Gym Казанлък"
        description="Панел за модерация на съдържание"
        noindex={true}
      />
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Shield className="w-10 h-10 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8)', letterSpacing: '0.05em' }}>
                  Модерационен панел
                </h1>
                <p className="text-muted-foreground">Управление на докладвани постове</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              onClick={() => {
                setIsAuthenticated(false);
                setAdminKey("");
                setReports([]);
              }}
            >
              Изход
            </Button>
          </div>

          {reports.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <AlertTriangle className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg text-muted-foreground">Няма докладвани постове</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {reports.map((report) => (
                <Card key={report.id} className="border-orange-500/50">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <CardTitle className="text-xl mb-2">
                          {report.blog_posts.title}
                        </CardTitle>
                        <CardDescription>
                          Автор: {report.blog_posts.author_name} • Категория: {report.blog_posts.category}
                        </CardDescription>
                      </div>
                      <Badge variant="destructive">
                        {report.reason}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {report.details && (
                      <div className="mb-4 p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          <strong>Детайли:</strong> {report.details}
                        </p>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <span>Докладван: {new Date(report.created_at).toLocaleString('bg-BG')}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeletePost(report.blog_post_id)}
                        className="gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Изтрий пост
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDismissReport(report.id)}
                        className="gap-2"
                      >
                        <X className="w-4 h-4" />
                        Отхвърли доклад
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
