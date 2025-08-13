import React from 'react';
import { ChefHat, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const LoadingState: React.FC = () => {
  return (
    <Card className="w-full max-w-2xl mx-auto shadow-elegant">
      <CardContent className="p-8">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-gradient-warm flex items-center justify-center animate-pulse">
              <ChefHat className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="absolute -top-1 -right-1">
              <Sparkles className="w-6 h-6 text-primary animate-bounce" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold">Analyzing your delicious dish...</h3>
            <p className="text-muted-foreground">
              Our AI chef is studying the image and creating a personalized recipe just for you!
            </p>
          </div>
          
          <div className="w-full max-w-xs">
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full bg-gradient-warm animate-pulse rounded-full w-3/4"></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">This usually takes 10-15 seconds</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};