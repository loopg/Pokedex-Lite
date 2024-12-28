// import React from "react";

// const Modal: React.FC<{ show: boolean; onClose: () => void; children: React.ReactNode }> = ({ show, onClose, children }) => {
//   if (!show) return null;

//   return (
//     <div className="modal">
//       <div className="modal-content">
//         <button onClick={onClose}>Close</button>
//         {children}
//       </div>
//     </div>
//   );
// };

// export default Modal;


import React from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) return null; // If show is false, don't render the modal

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
