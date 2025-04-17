
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf, ThumbsUp, Recycle, BadgeCheck, Search, Package } from "lucide-react";
import ProductDetail from "@/components/ProductDetail";

// Mock API data for demonstration
const mockProducts = [
  {
    id: 1,
    name: "Eco-Friendly Water Bottle",
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: "$24.99",
    rating: 4.5,
    ecoScore: 9.2,
    description: "Reusable stainless steel water bottle made from recycled materials.",
    badges: ["recyclable", "sustainable-materials", "plastic-free"],
    alternatives: [2, 5]
  },
  {
    id: 2,
    name: "Bamboo Toothbrush Set",
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: "$12.99",
    rating: 4.8,
    ecoScore: 9.5,
    description: "Biodegradable bamboo toothbrushes with plant-based bristles.",
    badges: ["biodegradable", "plastic-free", "cruelty-free"],
    alternatives: [3]
  },
  {
    id: 3,
    name: "Organic Cotton T-Shirt",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: "$29.99",
    rating: 4.3,
    ecoScore: 8.7,
    description: "100% organic cotton t-shirt made with sustainable farming practices.",
    badges: ["organic", "fair-trade", "sustainable-materials"],
    alternatives: [6]
  },
  {
    id: 4,
    name: "Recycled Paper Notebook",
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: "$8.99",
    rating: 4.6,
    ecoScore: 9.0,
    description: "Notebook made from 100% post-consumer recycled paper.",
    badges: ["recyclable", "recycled-materials", "plastic-free"],
    alternatives: [7]
  },
  {
    id: 5,
    name: "Compostable Phone Case",
    image: "https://images.unsplash.com/photo-1606041011872-596597976b25?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: "$19.99",
    rating: 4.1,
    ecoScore: 8.5,
    description: "Phone case made from plant-based materials that are fully compostable.",
    badges: ["compostable", "plastic-free", "sustainable-materials"],
    alternatives: [1]
  },
  {
    id: 6,
    name: "Solar Powered Charger",
    image: "https://images.unsplash.com/photo-1620826992386-d23683baed6b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: "$49.99",
    rating: 4.4,
    ecoScore: 8.9,
    description: "Portable solar charger that reduces reliance on grid electricity.",
    badges: ["renewable-energy", "sustainable-materials", "carbon-neutral"],
    alternatives: [8]
  },
  {
    id: 7,
    name: "Beeswax Food Wraps",
    image: "https://images.unsplash.com/photo-1590005354167-6da97870c757?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: "$16.99",
    rating: 4.7,
    ecoScore: 9.3,
    description: "Reusable food wraps made from organic cotton and beeswax, an alternative to plastic wrap.",
    badges: ["reusable", "biodegradable", "plastic-free"],
    alternatives: [4]
  },
  {
    id: 8,
    name: "Recycled Plastic Backpack",
    image: "https://images.unsplash.com/photo-1577733966773-d2ed6a0f0b1f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: "$59.99",
    rating: 4.2,
    ecoScore: 7.5,
    description: "Durable backpack made from recycled ocean plastic.",
    badges: ["recycled-materials", "ocean-friendly", "sustainable-materials"],
    alternatives: [3, 5]
  },
  {
    id: 9,
    name: "LED Energy Saving Bulbs",
    image: "https://images.unsplash.com/photo-1473733836739-e8ecf946a8ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: "$14.99",
    rating: 4.8,
    ecoScore: 9.0,
    description: "Energy-efficient LED bulbs that last longer and consume less electricity.",
    badges: ["energy-efficient", "long-lasting", "recyclable"],
    alternatives: [6]
  },
  {
    id: 10,
    name: "Natural Loofah Sponge",
    image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    price: "$6.99",
    rating: 4.5,
    ecoScore: 9.5,
    description: "100% natural loofah sponge for dish cleaning and personal care.",
    badges: ["biodegradable", "plastic-free", "compostable"],
    alternatives: [2, 7]
  }
];

const Index = () => {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // Filter products based on search and active tab
    let filtered = products;
    
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (activeTab !== "all") {
      filtered = filtered.filter(product => 
        product.badges.includes(activeTab)
      );
    }
    
    setFilteredProducts(filtered);
  }, [searchTerm, products, activeTab]);

  const fetchProductsFromAPI = async () => {
    // This would normally fetch data from actual APIs
    // For now, we'll use our mock data
    console.log("Fetching products from API...");
    // In a real implementation, this would call multiple APIs as requested
  };

  useEffect(() => {
    fetchProductsFromAPI();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    // Search logic is handled in the useEffect above
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    window.scrollTo(0, 0);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case 'recyclable':
        return <Recycle className="h-4 w-4 mr-1" />;
      case 'biodegradable':
      case 'compostable':
        return <Leaf className="h-4 w-4 mr-1" />;
      case 'organic':
      case 'fair-trade':
        return <BadgeCheck className="h-4 w-4 mr-1" />;
      case 'sustainable-materials':
      case 'recycled-materials':
        return <Package className="h-4 w-4 mr-1" />;
      default:
        return <ThumbsUp className="h-4 w-4 mr-1" />;
    }
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'recyclable':
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case 'biodegradable':
      case 'compostable':
        return "bg-green-100 text-green-800 hover:bg-green-200";
      case 'organic':
      case 'fair-trade':
        return "bg-purple-100 text-purple-800 hover:bg-purple-200";
      case 'plastic-free':
        return "bg-teal-100 text-teal-800 hover:bg-teal-200";
      case 'sustainable-materials':
      case 'recycled-materials':
        return "bg-amber-100 text-amber-800 hover:bg-amber-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const formatBadgeLabel = (badge) => {
    return badge.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {selectedProduct ? (
        <ProductDetail 
          product={selectedProduct} 
          onClose={closeProductDetail} 
          alternatives={products.filter(p => selectedProduct.alternatives.includes(p.id))}
          getBadgeIcon={getBadgeIcon}
          getBadgeColor={getBadgeColor}
          formatBadgeLabel={formatBadgeLabel}
        />
      ) : (
        <>
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold mb-2 text-green-800">EcoCart</h1>
            <p className="text-xl text-gray-600 mb-6">Find eco-friendly products and sustainable alternatives</p>
            
            <form onSubmit={handleSearch} className="flex max-w-lg mx-auto mb-8">
              <Input
                type="text"
                placeholder="Search for eco-friendly products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow mr-2 border-green-300 focus:border-green-500"
              />
              <Button type="submit" className="bg-green-600 hover:bg-green-700">
                <Search className="h-4 w-4 mr-2" /> Search
              </Button>
            </form>

            <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-4 md:grid-cols-7 bg-green-50">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="recyclable">Recyclable</TabsTrigger>
                <TabsTrigger value="biodegradable">Biodegradable</TabsTrigger>
                <TabsTrigger value="plastic-free">Plastic-Free</TabsTrigger>
                <TabsTrigger value="sustainable-materials">Sustainable</TabsTrigger>
                <TabsTrigger value="organic">Organic</TabsTrigger>
                <TabsTrigger value="fair-trade">Fair Trade</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <Card 
                  key={product.id} 
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => handleProductClick(product)}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{product.name}</CardTitle>
                      <div className="flex items-center bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                        <Leaf className="h-4 w-4 mr-1" />
                        {product.ecoScore}/10
                      </div>
                    </div>
                    <CardDescription>{product.price}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {product.badges.slice(0, 3).map((badge) => (
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
                    <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full text-green-600 border-green-600 hover:bg-green-50">
                      View Details
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <h3 className="text-xl font-medium text-gray-600">No products found matching your criteria</h3>
                <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Index;
