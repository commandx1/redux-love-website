const GalleryModal = ({ open, onClose, img }) => {
  return (
    <>
      {open && <div className='backdrop'></div>}
      <div
        className='img-box'
        style={
          open
            ? { opacity: 1, pointerEvents: 'visible' }
            : { opacity: 0, pointerEvents: 'none' }
        }
        onClick={e => {
          e.target.classList.contains('img-box') && onClose();
        }}
      >
        <img src={process.env.REACT_APP_IMAGE_URL + img?.imageUrl} />
      </div>
    </>
  );
};

export default GalleryModal;
