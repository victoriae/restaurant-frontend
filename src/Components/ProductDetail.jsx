import React from 'react'
import { useSelector } from 'react-redux'

export const ProductDetail = () => {
  const { currentProduct } = useSelector(store => store.productReducer)
  const base_images_url = process.env.REACT_APP_IMAGES_URL

  document.addEventListener("click", e => {
    if (e.target === document.querySelector(".modal.is-visible")) {
      document.querySelector(".modal.is-visible").classList.remove('is-visible');
    }
  });

  document.addEventListener("keyup", e => {
    if (e.key === "Escape" && document.querySelector(".modal.is-visible")) {
      document.querySelector(".modal.is-visible").classList.remove('is-visible');
    }
  });
  return (
    <div className="modal" id="modal1" data-animation="slideInOutLeft">
      {
        currentProduct &&
        <div className="modal-dialog">
          <header className="modal-header">
            <h2>{currentProduct.name}</h2>
            <button className="close-modal"
              aria-label="close modal"
              data-close
              onClick={() => document.getElementById('modal1').classList.remove('is-visible')}>
              ✕
            </button>
          </header>
          <section className="modal-content d-grid">
            <div className="modal-content-image">
              <img className="modal-image" alt={currentProduct.name} src={base_images_url + currentProduct.image_file_name} />
            </div>
            <div className="modal-content-description">
              {currentProduct.description}
            </div>
          </section>
          <footer className="modal-footer">
            Price: ${currentProduct.price}
          </footer>
        </div>
      }
    </div>
  )
}
