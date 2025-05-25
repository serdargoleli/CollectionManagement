import React, { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import { useCollectionDetail } from "@/core/store/useCollectionDetailStore";
import { ProductCardProps } from "@/core/models/ui/ProductCardProps";

// Props interface'ini genişlet
interface ExtendedProductCardProps extends ProductCardProps {
  sortableId?: string;
}

const ProductCard: React.FC<ExtendedProductCardProps> = ({ product, isConstant = false, sortableId }) => {
  const [isHovered, setIsHovered] = useState(false);

  // @dnd-kit sortable hook - sadece sabit ürünler için
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: sortableId || `${product.productCode}-${product.colorCode}`,
    disabled: !isConstant, // Sadece sabit ürünlerde drag enabled
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.8 : 1,
  };

  const { addToConstants, removeFromConstants, isInConstants } = useCollectionDetail();
  const inConstants = isInConstants(product.productCode, product.colorCode);

  const handleAddToConstants = () => {
    if (isConstant) {
      removeFromConstants(product.productCode);
    } else {
      addToConstants(product);
    }
  };

  const getButtonText = () => {
    if (isConstant) return "Sabitlerden Çıkar";
    if (inConstants) return "Sabitlere Eklendi";
    return "Sabitlere Ekle";
  };

  const getButtonIcon = () => {
    if (isConstant) return <AddCircleOutlinedIcon className="rotate-45" />;
    if (inConstants) return <CheckCircleOutlinedIcon />;
    return <AddCircleOutlinedIcon />;
  };

  return (
    <div className="h-full" ref={isConstant ? setNodeRef : undefined} style={isConstant ? style : undefined}>
      <div
        className={`product-card group ${isDragging ? "scale-105 border-2 border-blue-400 shadow-2xl" : ""} ${isConstant ? "drag-enabled" : ""}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="product-card-content">
          <div className="product-card-header">
            <div className="flex items-center gap-2">
              {product.isSaleB2B && <div className="isb2b">B2B</div>}
              {isConstant && (
                <>
                  <div className="isConstants">SABİT</div>
                </>
              )}
            </div>

            <div className={`outOfStock ${product.outOfStock ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
              <div className={`h-2 w-2 rounded-full ${product.outOfStock ? "bg-red-500" : "bg-green-500"}`}></div>
              {product.outOfStock ? "Stokta Yok" : "Stokta Var"}
            </div>
          </div>
          <div className="product-card-body">
            <img src={product.imageUrl} alt={product.name} className="product-card-image group-hover:scale-110" />

            <div className={`product-card-overlay ${(inConstants && !isConstant) || isHovered ? "opacity-100" : "opacity-0"} `}>
              <button onClick={handleAddToConstants} className="add-toggle-button">
                {getButtonIcon()}
                {getButtonText()}
              </button>
            </div>
          </div>

          <div className="product-card-footer">
            <h3 className="product-title">{product.name}</h3>
            <span className="text-sm">Kod: {product.productCode}</span>
            {isConstant && (
              <div className="drag-handle flex cursor-grab items-center justify-center active:cursor-grabbing" {...attributes} {...listeners}>
                <DragIndicatorIcon fontSize="small" className="text-black hover:text-gray-600" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
