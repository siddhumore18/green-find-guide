
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Leaf, Star } from "lucide-react";

interface ProductDetailProps {
  product: any;
  onClose: () => void;
  alternatives: any[];
  getBadgeIcon: (badge: string) => JSX.Element;
  getBadgeColor: (badge: string) => string;
  formatBadgeLabel: (badge: string) => string;
}

const ProductDetail = ({ 
  product, 
  onClose, 
  alternatives, 
  getBadgeIcon,
  getBadgeColor,
  formatBadgeLabel
}: ProductDetailProps) => {
  const [showAlternatives, setShowAlternatives] = useState(false);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="h-5 w-5 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-5 w-5 text-yellow-400" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="h-5 w-5 text-gray-300" />);
    }
    
    return stars;
  };

  const getEcoScoreColor = (score: number) => {
    if (score >= 9) return "bg-green-600";
    if (score >= 7) return "bg-green-500";
    if (score >= 5) return "bg-yellow-500";
    if (score >= 3) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="bg-white rounded-lg p-6 animate-fade-in">
      <Button 
        variant="ghost" 
        className="mb-4 text-gray-600 hover:text-gray-900" 
        onClick={onClose}
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to products
      </Button>
      
      {!showAlternatives ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-cover"
            />
          </div>
          
          <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <p className="text-xl font-semibold text-gray-700 mb-4">{product.price}</p>
            
            <div className="flex items-center mb-4">
              <div className="flex mr-4">
                {renderStars(product.rating)}
              </div>
              <span className="text-gray-600">{product.rating} out of 5</span>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <h3 className="text-lg font-semibold mr-2">Eco Score:</h3>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${getEcoScoreColor(product.ecoScore)}`}>
                    {product.ecoScore}
                  </div>
                  <span className="ml-2 text-gray-600">/10</span>
                </div>
              </div>
              <p className="text-gray-600 mb-4">
                {product.ecoScore >= 9 ? "Excellent" : 
                 product.ecoScore >= 7 ? "Very Good" : 
                 product.ecoScore >= 5 ? "Good" : 
                 product.ecoScore >= 3 ? "Fair" : "Poor"} environmental impact
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Sustainability Features:</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {product.badges.map((badge: string) => (
                  <Badge 
                    key={badge} 
                    variant="outline" 
                    className={getBadgeColor(badge)}
                  >
                    {getBadgeIcon(badge)}
                    {formatBadgeLabel(badge)}
                  </Badge>
                ))}
              </div>
            </div>
            
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            {alternatives.length > 0 && (
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={() => setShowAlternatives(true)}
              >
                <Leaf className="h-4 w-4 mr-2" />
                View Greener Alternatives
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-green-800">Greener Alternatives for {product.name}</h2>
          
          <Button 
            variant="outline" 
            className="mb-6 border-green-600 text-green-600 hover:bg-green-50"
            onClick={() => setShowAlternatives(false)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Product Details
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alternatives.map((alt) => (
              <Card key={alt.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-40 overflow-hidden">
                  <img 
                    src={alt.image} 
                    alt={alt.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{alt.name}</CardTitle>
                    <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                      <Leaf className="h-4 w-4 mr-1" />
                      {alt.ecoScore}/10
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {alt.badges.slice(0, 3).map((badge: string) => (
                      <Badge 
                        key={badge} 
                        variant="outline" 
                        className={getBadgeColor(badge)}
                      >
                        {getBadgeIcon(badge)}
                        {formatBadgeLabel(badge)}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-2">{alt.description}</p>
                </CardContent>
                <CardFooter>
                  <div className="w-full">
                    <p className="text-base font-medium mb-2">{alt.price}</p>
                    <Button 
                      variant="outline" 
                      className="w-full text-green-600 border-green-600 hover:bg-green-50"
                      onClick={() => {
                        setShowAlternatives(false);
                        onClose();
                        // In a real app, this would navigate to the alternative product
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="bg-green-50 rounded-lg p-4 mt-8">
            <h3 className="text-lg font-semibold text-green-800 mb-2">Why These Alternatives?</h3>
            <p className="text-gray-700">
              These products have been selected as greener alternatives based on higher eco-scores, 
              more sustainable materials, ethical manufacturing practices, and reduced environmental impact.
            </p>
          </div>
        </div>
      )}
      
      <Separator className="my-8" />
      
      <div className="text-center text-gray-500 text-sm">
        <p>EcoCart - Making sustainable shopping easier</p>
        <p className="mt-1">All eco-ratings are based on material sustainability, brand ethics, and environmental impact.</p>
      </div>
    </div>
  );
};

export default ProductDetail;
