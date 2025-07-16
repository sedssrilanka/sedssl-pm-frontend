'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { statusSteps, STATUS_CONFIG } from '@/data/status-configs';
import { cn } from '@/lib/utils';

const LoadingState = () => (
  <Card className="w-full mx-auto border-none">
    <CardHeader className="space-y-6">
      <Skeleton className="h-8 w-48" />
      <Skeleton className="h-4 w-32" />
    </CardHeader>
    <CardContent className="space-y-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center space-x-6">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-3 flex-1">
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
);

const EmptyState = () => (
  <Card className="w-full max-w-2xl mx-auto">
    <CardHeader className="space-y-6">
      <CardTitle className="flex items-center gap-3 text-xl">
        <AlertCircle className="h-6 w-6 text-muted-foreground" />
        No Membership Found
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription className="text-base">
          No membership record found. Please complete your registration to track your application
          status.
        </AlertDescription>
      </Alert>
    </CardContent>
  </Card>
);

export function MembershipStatusProgress() {
  const supabase = createClient();
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatus = async () => {
      setLoading(true);
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) {
        setStatus(null);
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('memberships')
        .select('status')
        .eq('user_id', user.id)
        .single();
      setStatus(error ? null : data.status);
      setLoading(false);
    };
    fetchStatus();
  }, []);

  if (loading) return <LoadingState />;
  if (!status) return <EmptyState />;

  const currentIndex = statusSteps.indexOf(status);
  const progressValue = status === 'rejected' ? 0 : ((currentIndex + 1) / statusSteps.length) * 100;

  return (
    <Card className="w-full border-none">
      <CardHeader className="space-y-8">
        <div className="space-y-4">
          <CardTitle className="text-2xl">Membership Application</CardTitle>
        </div>
        {status !== 'rejected' && (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Application Progress</span>
              <span className="font-medium">{Math.round(progressValue)}% Complete</span>
            </div>
            <Progress value={progressValue} className="h-3" />
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-8">
        {status === 'rejected' ? (
          <Alert variant="destructive">
            <XCircle className="h-5 w-5" />
            <AlertDescription className="text-base">
              {STATUS_CONFIG.rejected.description}. You may submit a new application or contact our
              support team for more information.
            </AlertDescription>
          </Alert>
        ) : (
          <div className="space-y-8">
            {statusSteps.map((step, index) => {
              const isDone = index < currentIndex;
              const isCurrent = index === currentIndex;
              const stepConfig = STATUS_CONFIG[step as keyof typeof STATUS_CONFIG];
              return (
                <div key={step} className="flex items-start gap-6">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-200',
                        isDone
                          ? 'bg-primary border-primary text-primary-foreground shadow-sm'
                          : isCurrent
                            ? 'bg-primary/10 border-primary text-primary shadow-sm'
                            : 'bg-muted border-muted-foreground/30 text-muted-foreground'
                      )}
                    >
                      {isDone ? <CheckCircle className="h-5 w-5" /> : <Clock className="h-5 w-5" />}
                    </div>
                    {index < statusSteps.length - 1 && (
                      <div
                        className={cn(
                          'w-0.5 h-12 mt-3 transition-colors duration-200',
                          isDone ? 'bg-primary' : 'bg-muted-foreground/20'
                        )}
                      />
                    )}
                  </div>
                  <div className="flex-1 space-y-3 pb-6">
                    <div className="space-y-2">
                      <h3
                        className={cn(
                          'font-semibold text-lg',
                          isDone
                            ? 'text-foreground'
                            : isCurrent
                              ? 'text-primary'
                              : 'text-muted-foreground'
                        )}
                      >
                        {stepConfig.label}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {stepConfig.description}
                      </p>
                    </div>
                    {isCurrent && (
                      <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                        Current Step
                      </Badge>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
