import React, { useState } from 'react';
import { ImageUploader } from '@/components/ImageUploader';
import { RecipeDisplay } from '@/components/RecipeDisplay';
import { SampleImages } from '@/components/SampleImages';
import { LoadingState } from '@/components/LoadingState';
import { generateRecipeFromImage } from '@/services/recipeService';
import { Button } from '@/components/ui/button';
import { ChefHat, Sparkles, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';
import heroFood from '@/assets/hero-food.jpg';

interface Recipe {
  title: string;
  description: string;
  cookTime: string;
  servings: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  instructions: string[];
  tips?: string[];
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleImageUpload = async (file: File) => {
    setIsLoading(true);
    try {
      const generatedRecipe = await generateRecipeFromImage(file);
      setRecipe(generatedRecipe);
      toast.success("Recipe generated successfully!");
    } catch (error) {
      console.error('Error generating recipe:', error);
      toast.error("Failed to generate recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSampleSelect = async (imageUrl: string, fileName: string) => {
    setUploadedImage(imageUrl);
    setIsLoading(true);
    
    try {
      // Convert data URL to File object for the service
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], fileName, { type: blob.type });
      
      const generatedRecipe = await generateRecipeFromImage(file);
      setRecipe(generatedRecipe);
      toast.success("Recipe generated successfully!");
    } catch (error) {
      console.error('Error generating recipe:', error);
      toast.error("Failed to generate recipe. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetApp = () => {
    setRecipe(null);
    setUploadedImage(null);
  };

  if (recipe) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" onClick={resetApp}>
              <ArrowLeft className="w-4 h-4" />
              Try Another Dish
            </Button>
            <div className="flex items-center gap-2">
              <ChefHat className="w-6 h-6 text-primary" />
              <h1 className="text-2xl font-bold">Recipe Generated!</h1>
            </div>
          </div>
          <RecipeDisplay recipe={recipe} />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <LoadingState />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroFood})` }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center text-white max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <ChefHat className="w-12 h-12 text-primary-glow" />
              <Sparkles className="w-8 h-8 text-primary-glow animate-pulse" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Turn Any Food Photo Into a <span className="bg-gradient-warm bg-clip-text text-transparent">Perfect Recipe</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
              Upload a photo of any dish and our AI chef will create a detailed, step-by-step recipe for you to recreate it at home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" className="text-lg px-8 py-3">
                <ChefHat className="w-5 h-5" />
                Start Cooking
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-3 bg-white/10 border-white/30 text-white hover:bg-white/20">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Upload Section */}
          <div className="text-center space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Upload Your Food Photo</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Simply drag and drop or click to upload a photo of your favorite dish, and we'll create a detailed recipe for you.
              </p>
            </div>
            <ImageUploader onImageUpload={handleImageUpload} isLoading={isLoading} />
          </div>

          {/* Sample Images */}
          <div className="space-y-8">
            <SampleImages onSampleSelect={handleSampleSelect} isLoading={isLoading} />
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 py-16">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gradient-warm flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold">AI-Powered Analysis</h3>
              <p className="text-muted-foreground">
                Our advanced AI analyzes your food photos to identify ingredients and cooking methods.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gradient-appetizing flex items-center justify-center mx-auto">
                <ChefHat className="w-8 h-8 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Detailed Instructions</h3>
              <p className="text-muted-foreground">
                Get step-by-step cooking instructions with ingredient lists and chef tips.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-success flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8 text-success-foreground" />
              </div>
              <h3 className="text-xl font-semibold">Perfect Results</h3>
              <p className="text-muted-foreground">
                Recreate restaurant-quality dishes at home with our precise recipes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
