import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, BookOpen, Video, FileText } from 'lucide-react';

export const Tutorials = () => {
  const tutorials = [
    {
      id: 1,
      title: 'Getting Started with Splash AI Studio',
      description: 'Learn the basics of creating your first AI-generated product image',
      duration: '5 min',
      level: 'Beginner',
      thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
      type: 'video'
    },
    {
      id: 2,
      title: 'Creating Model Images with Human Photos',
      description: 'Step-by-step guide to upload and use human model photos effectively',
      duration: '8 min',
      level: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400',
      type: 'video'
    },
    {
      id: 3,
      title: 'Building Campaign-Ready Visuals',
      description: 'Master the art of combining assets into stunning campaign images',
      duration: '10 min',
      level: 'Advanced',
      thumbnail: 'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=400',
      type: 'video'
    },
    {
      id: 4,
      title: 'Project Collaboration Best Practices',
      description: 'Learn how to effectively work with team members on projects',
      duration: '6 min',
      level: 'Intermediate',
      thumbnail: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400',
      type: 'article'
    },
  ];

  const getLevelColor = (level) => {
    switch(level) {
      case 'Beginner': return 'bg-success/10 text-success';
      case 'Intermediate': return 'bg-accent/10 text-accent';
      case 'Advanced': return 'bg-secondary/10 text-secondary';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Tutorials & Walkthroughs</h1>
        <p className="text-muted-foreground">Learn how to get the most out of Splash AI Studio</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <Card key={tutorial.id} className="group overflow-hidden shadow-md hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 cursor-pointer">
            <div className="relative h-48 overflow-hidden">
              <img
                src={tutorial.thumbnail}
                alt={tutorial.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-center justify-center">
                {tutorial.type === 'video' ? (
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <PlayCircle className="w-10 h-10 text-white" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                    <FileText className="w-10 h-10 text-white" />
                  </div>
                )}
              </div>
              <Badge className="absolute top-4 right-4 bg-primary/80 backdrop-blur-sm">
                {tutorial.duration}
              </Badge>
            </div>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge className={getLevelColor(tutorial.level)} variant="outline">
                  {tutorial.level}
                </Badge>
              </div>
              <CardTitle className="text-lg group-hover:text-accent transition-colors">{tutorial.title}</CardTitle>
              <CardDescription className="line-clamp-2">{tutorial.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Tutorials;