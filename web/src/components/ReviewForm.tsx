import { useState, useEffect } from 'react';
import { X, Star } from 'lucide-react';
import type { Review, CreateReviewDto, UpdateReviewDto } from '../types';
import { create as createReview, update as updateReview } from '../services/review';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

interface ReviewFormProps {
  productId: string;
  review?: Review | null;
  onSubmit: () => void;
  onCancel: () => void;
}

export const ReviewForm = ({ productId, review, onSubmit, onCancel }: ReviewFormProps) => {
  const [formData, setFormData] = useState({
    author: '',
    rating: 5,
    comment: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (review) {
      setFormData({
        author: review.author,
        rating: review.rating,
        comment: review.comment
      });
    }
  }, [review]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.author.trim() || !formData.comment.trim()) {
      setError('Nome e comentário são obrigatórios');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (review) {
        const updateData: UpdateReviewDto = {
          _id: review._id,
          ...formData
        };
        await updateReview(review._id, updateData);
      } else {
        const createData: CreateReviewDto = {
          ...formData,
          productId
        };
        await createReview(createData);
      }
      onSubmit();
    } catch (err) {
      setError('Erro ao salvar avaliação');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseInt(value) || 1 : value
    }));
  };

  const handleStarClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, i) => (
      <button
        key={i}
        type="button"
        onClick={() => handleStarClick(i + 1)}
        className="p-1 hover:scale-110 transition-transform"
      >
        <Star
          className={`w-6 h-6 ${
            i < formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
          }`}
        />
      </button>
    ));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{review ? 'Editar Avaliação' : 'Nova Avaliação'}</CardTitle>
            <Button variant="ghost" size="icon" onClick={onCancel}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="author" className="text-sm font-medium">Nome</label>
              <Input
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                disabled={!!review}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Avaliação</label>
              <div className="flex gap-1">
                {renderStars()}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="comment" className="text-sm font-medium">Comentário</label>
              <Textarea
                id="comment"
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            {error && (
              <div className="text-sm text-destructive">{error}</div>
            )}

            <div className="flex gap-2 pt-4">
              <Button type="button" variant="outline" onClick={onCancel} disabled={loading} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" disabled={loading} className="flex-1">
                {loading ? 'Salvando...' : 'Salvar'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
