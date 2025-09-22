import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Star, Edit, Trash2, Plus } from 'lucide-react'
import type { Product, Review } from '../types'
import { getByProductId as getReviewByProductId, getAverageRating as getAverageProductRating, deleteOne as deleteById } from '../services/review'
import { getById as getProductById } from '../services/product'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { ReviewForm } from '../components/ReviewForm'

export function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [averageRating, setAverageRating] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [editingReview, setEditingReview] = useState<Review | null>(null)

  useEffect(() => {
    if (id) {
      loadProductData()
    }
  }, [id])

  const loadProductData = async () => {
    if (!id) return
    
    try {
      setLoading(true)
      const [productData, reviewsData, avgRating] = await Promise.all([
        getProductById(id),
        getReviewByProductId(id),
        getAverageProductRating(id)
      ])
      
      setProduct(productData)
      setReviews(reviewsData)
      setAverageRating(Number(avgRating) || 0)
    } catch (err) {
      setError('Erro ao carregar dados do produto')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta avaliação?')) return
    
    try {
      await deleteById(reviewId)
      setReviews(reviews.filter(r => r._id !== reviewId))
      
      if (id) {
        const avgRating = await getAverageProductRating(id)
        setAverageRating(Number(avgRating) || 0)
      }
    } catch (err) {
      setError('Erro ao excluir avaliação')
      console.error(err)
    }
  }

  const handleReviewFormSubmit = () => {
    setShowReviewForm(false)
    setEditingReview(null)
    loadProductData()
  }

  const handleReviewFormCancel = () => {
    setShowReviewForm(false)
    setEditingReview(null)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
        }`}
      />
    ))
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-lg">Carregando produto...</div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-lg text-destructive mb-4">{error || 'Produto não encontrado'}</div>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Voltar aos Produtos
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button asChild variant="outline" className="mb-6">
        <Link to="/">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar aos Produtos
        </Link>
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{product.name}</CardTitle>
            <CardDescription className="text-xl font-semibold text-primary">
              R$ {product.price.toFixed(2)}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{product.description}</p>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex">{renderStars(Math.round(averageRating))}</div>
              <span className="text-sm text-muted-foreground">
                ({averageRating.toFixed(1)} - {reviews.length} avaliações)
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Avaliações</CardTitle>
              <Button onClick={() => setShowReviewForm(true)} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Nova Avaliação
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {reviews.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground mb-4">Nenhuma avaliação ainda</p>
                <Button onClick={() => setShowReviewForm(true)} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Seja o primeiro a avaliar
                </Button>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {reviews.map((review) => (
                  <div key={review._id} className="border-b pb-4 last:border-b-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-sm text-muted-foreground">
                          por {review.author}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingReview(review)
                            setShowReviewForm(true)
                          }}
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteReview(review._id)}
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {showReviewForm && (
        <ReviewForm
          productId={id!}
          review={editingReview}
          onSubmit={handleReviewFormSubmit}
          onCancel={handleReviewFormCancel}
        />
      )}
    </div>
  )
}
