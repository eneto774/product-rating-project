import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Product, CreateProductDto, UpdateProductDto } from '../types';
import { productService } from '../services/api';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

interface ProductFormProps {
  product?: Product | null;
  onSubmit: () => void;
  onCancel: () => void;
}

export const ProductForm = ({ product, onSubmit, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price,
        category: product.category
      });
    }
  }, [product]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.description.trim() || !formData.category.trim()) {
      setError('Todos os campos são obrigatórios');
      return;
    }

    if (formData.price <= 0) {
      setError('O preço deve ser maior que zero');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (product) {
        const updateData: UpdateProductDto = {
          _id: product._id,
          ...formData
        };
        await productService.update(product._id, updateData);
      } else {
        const createData: CreateProductDto = formData;
        await productService.create(createData);
      }
      onSubmit();
    } catch (err) {
      setError('Erro ao salvar produto');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{product ? 'Editar Produto' : 'Novo Produto'}</CardTitle>
            <Button variant="ghost" size="icon" onClick={onCancel}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Nome</label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="category" className="text-sm font-medium">Categoria</label>
              <Input
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Descrição</label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium">Preço</label>
              <Input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                min="0"
                step="0.01"
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
