"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, Upload, X } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface ReviewDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (review: { rating: number; comment: string; images: string[] }) => void;
  productName: string;
  existingReview?: { rating: number; comment: string; images: string[] } | null;
}

export function ReviewDialog({ open, onClose, onSubmit, productName, existingReview }: ReviewDialogProps) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (open && existingReview) {
      setRating(existingReview.rating);
      setComment(existingReview.comment);
      setImages(existingReview.images || []);
    } else if (open && !existingReview) {
      setRating(0);
      setComment('');
      setImages([]);
    }
  }, [open, existingReview]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImages((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (rating === 0) {
      alert('กรุณาให้คะแนน'); // จริงๆ ควรใช้ Toast notification
      return;
    }
    onSubmit({ rating, comment, images });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">เขียนรีวิว</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Product Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">สินค้า</p>
            <p className="font-medium text-lg">{productName}</p>
          </div>

          {/* Rating Stars */}
          <div>
            <p className="mb-3 font-medium">ให้คะแนนความพึงพอใจ</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110 focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-200'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment Area */}
          <div>
            <p className="mb-3 font-medium">รีวิวของคุณ</p>
            <Textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="เล่าประสบการณ์การใช้งานสินค้านี้... วัสดุเป็นอย่างไร? การบริการเป็นอย่างไร?"
              rows={5}
              className="resize-none focus-visible:ring-black"
            />
          </div>

          {/* Image Upload */}
          <div>
            <p className="mb-3 font-medium">รูปภาพประกอบ (ไม่บังคับ)</p>
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative group aspect-square">
                  <Image
                    src={image}
                    alt={`Review ${index + 1}`}
                    fill
                    className="object-cover rounded-lg border border-gray-200"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              
              {images.length < 3 && (
                <label className="aspect-square border-2 border-dashed border-gray-200 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 hover:border-black/20 transition-all">
                  <Upload className="w-6 h-6 mb-2 text-gray-400" />
                  <span className="text-xs text-gray-500">เพิ่มรูปภาพ</span>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <Button
              onClick={handleSubmit}
              className="flex-1 bg-black hover:bg-gray-800 text-white"
            >
              ส่งรีวิว
            </Button>
            <Button 
              onClick={onClose} 
              variant="outline" 
              className="flex-1 border-gray-200 hover:bg-gray-50"
            >
              ยกเลิก
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}