import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import samplePizza from '@/assets/sample-pizza.jpg';
import sampleSalad from '@/assets/sample-salad.jpg';
import samplePasta from '@/assets/sample-pasta.jpg';

interface SampleImagesProps {
  onSampleSelect: (imageUrl: string, fileName: string) => void;
  isLoading?: boolean;
}

const sampleImages = [
  { src: samplePizza, name: 'Margherita Pizza', fileName: 'pizza.jpg' },
  { src: sampleSalad, name: 'Fresh Garden Salad', fileName: 'salad.jpg' },
  { src: samplePasta, name: 'Pasta Carbonara', fileName: 'pasta.jpg' }
];

export const SampleImages: React.FC<SampleImagesProps> = ({ onSampleSelect, isLoading }) => {
  const handleSampleClick = async (imageUrl: string, fileName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const file = new File([blob], fileName, { type: blob.type });
      
      // Create a data URL for display
      const reader = new FileReader();
      reader.onload = () => {
        onSampleSelect(reader.result as string, fileName);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error loading sample image:', error);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h3 className="text-lg font-semibold mb-4 text-center">Or try these sample dishes</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sampleImages.map((image, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-warm transition-smooth cursor-pointer group">
            <div className="relative">
              <img
                src={image.src}
                alt={image.name}
                className="w-full h-40 object-cover group-hover:scale-105 transition-smooth"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-smooth flex items-center justify-center">
                <Button
                  variant="hero"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-smooth"
                  onClick={() => handleSampleClick(image.src, image.fileName)}
                  disabled={isLoading}
                >
                  Try this dish
                </Button>
              </div>
            </div>
            <CardContent className="p-3">
              <p className="font-medium text-sm text-center">{image.name}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};