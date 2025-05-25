import React, { useState } from "react";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import { useCollectionDetail } from "@/core/store/useCollectionDetailStore";
import { ProductCardProps } from "@/core/models/ui/ProductCardProps"; // Store'u import et

const ProductCard: React.FC<ProductCardProps> = ({ product, isConstant = false }) => {
  const [isHovered, setIsHovered] = useState(false);

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
    <div className="h-full">
      <div className="product-card group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <div className="product-card-content">
          <div className="product-card-header">
            <div className="flex gap-2">
              {product.isSaleB2B && <div className="isb2b">B2B</div>}
              {isConstant && <div className="isConstants">SABİT</div>}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
