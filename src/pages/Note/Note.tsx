import React, { useEffect, useRef, useState } from 'react';
import { FaMarker } from 'react-icons/fa';
import styled from 'styled-components';
import api from '../../api/api';
import { AxiosResponse } from 'axios';
import { SuccessNotification, SuccessNotificationContent, WarningNotification, WarningNotificationContent } from '../../styles/CommonStyled';

// Estilos para o botão de nota
const ButtonNote = styled.button`
  height: 30px;
  width: 30px;
  position: relative; 
  background-color: #acabab;
  color: yellow;
  padding: 5px;
  font-size: 1rem;
  font-weight: bold;
  border: 1px solid #ccc;
  cursor: pointer;  
  float: right;
  transition: background-color 0.3s, transform 0.2s;
  top: -15px;
  border-radius: 0px;

  &:hover {
    background-color: #9d9d9d;
    transform: scale(1.05);
    border: 1px solid #7e7e7e;
  }

  &:focus {
    outline: none;
  }
`;

// Estilos para o Modal
const ModalTitle = styled.h3`
  font-weight: bold;
  color: #333333;
  text-align: center;
  margin-bottom: 0.5rem;
  margin-top: 0rem;
`;

const ModalOverlay = styled.div`
  position: absolute;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContainer = styled.div`
 background-color: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;  
  max-width: 600px;  
  height: auto;  
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0 auto; 
  
  @media (max-width: 768px) {
    width: 95%;  
    padding: 15px;
  }
`;

const Button = styled.button<{ bgColor: string }>`
  padding: 5px 10px; 
  font-size: 16px;
  color: white;
  background-color: ${(props) => props.bgColor};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 10px;
  margin-right: 5px;
  max-height: 35px;

  &:hover {
    background-color: ${(props) => (props.bgColor === '#007bff' ? '#0056b3' : '#218838')};
  }
`;

const TextContent = styled.div`
  white-space: pre-wrap; 
  /* word-wrap: break-word;  */
  max-height: 250px; 
  overflow: scroll; 
  margin-top: 10px;
  
  @media (max-width: 768px) {
    max-height: 200px;
  }
`;


interface Note {
    id: number;
    postId: number;
    start: number;
    end: number;
    text: string;
    textPost: string;
}

// Tipagem para as props do Modal
interface ModalProps {
    note: Note;
    onClose: () => void;
}

// Modal para adicionar notas
const Modal: React.FC<ModalProps> = ({ note, onClose }) => {
    const paragraphRef = useRef<HTMLDivElement>(null);
    const [selectionInfo, setSelectionInfo] = useState({
        start: 0,
        end: 0,
        length: 0,
    });

    const [warning, setWarning] = useState('');
    const [success, setSuccess] = useState('');

    console.log(note);
    const [noteData, setNoteData] = useState<Note | null>(null);

    useEffect(() => {
        if (noteData) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [noteData]);

    useEffect(() => {
        setNoteData(note);
    }, [note]);

    // Função para capturar a seleção de texto
    const handleSelection = () => {
        const selection = window.getSelection();
        if (!selection || selection.rangeCount === 0 || !paragraphRef.current) return;

        const range = selection.getRangeAt(0);
        const selectedText = selection.toString();

        // Detecta a posição e o tamanho da seleção
        setSelectionInfo({
            start: range.startOffset,
            length: selectedText.length,
            end: range.startOffset + selectedText.length
        });


        setNoteData({ ...noteData!, start: selectionInfo.start, end: selectionInfo.end });


    };

    // // Função para lidar com a mudança na nota
    // const handleNoteChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     setNoteData((prevData) => ({
    //         ...prevData!,
    //         text: e.target.value,
    //     }));
    // };

    // Função para salvar a nota
    const handleSaveNote = () => {
        if (noteData) {
            const { text, start, end, postId } = noteData;

            if ((start == 0 && end == 0) || (start - end == 0)) {
                console.log("selecione o trecho para adicionar a nota");
                setWarning('Selecione o trecho para adicionar a nota');
                return;
            }
            // Supondo que a API de salvar a nota seja algo assim:
            api.post(`/notes`, {
                text,
                postId,
                start,
                end
            })
                .then((response: AxiosResponse) => {
                    console.log("response: ", response)
                    setSuccess('Nota salva com sucesso');

                    setTimeout(() => {
                        setNoteData(null);
                        onClose();
                    }, 5000);
                })
                .catch((error) => {
                    setWarning('Ocorreu um problema ao adicionar nota');
                    console.error('Erro ao salvar a nota:', error);
                });
        }
    };


    const handleWarningClick = () => {
        setWarning('');
    };
    const handleSuccessClick = () => {
        setSuccess('');
    };

    return (

        <ModalOverlay>
            {
                warning &&
                <WarningNotification>
                    <WarningNotificationContent onClick={handleWarningClick}>{warning}</WarningNotificationContent>
                </WarningNotification>
            }

            {
                success &&
                <SuccessNotification>
                    <SuccessNotificationContent onClick={handleSuccessClick}>{success}</SuccessNotificationContent>
                </SuccessNotification>
            }

            <ModalContainer>
                <ModalTitle>Adicionar Nota</ModalTitle>
                <div>
                    <textarea
                        onChange={(e) => setNoteData({ ...noteData!, text: e.target.value })}
                        placeholder="Escreva sua nota aqui..."
                        rows={5}
                        style={{ width: '100%', resize: 'none' }}
                    />
                    <div>
                        <Button
                            bgColor="#28a745"
                            onClick={(e) => {
                                e.preventDefault();
                                handleSaveNote();
                            }}>Salvar</Button>

                        <Button
                            bgColor="#007bff"
                            onClick={(e) => {
                                e.preventDefault();
                                onClose();
                            }}>Cancelar</Button>
                    </div>

                </div>

                <div >
                    <div style={{ fontSize: '10px', textAlign: 'right' }}>
                        <strong>Informações da Seleção:</strong>
                        Inicio: {selectionInfo.start} - Tamanho: {selectionInfo.length}
                    </div>
                    <hr style={{ textAlign: 'center', width: '70%' }}></hr>

                    <div style={{ justifyContent: 'space-between', color: 'black', marginTop: 2 }}>
                        <ModalTitle style={{ textAlign: 'left' }}>Selecione o techo:</ModalTitle>

                        <div
                            ref={paragraphRef}
                            onMouseUp={handleSelection}
                            style={{
                                // width: '48%', // Ajuste a largura para garantir que haja um pequeno espaço entre as divs


                                // minHeight: '150px',

                                overflow: 'auto',
                            }}
                        >
                            <TextContent>
                                {noteData?.textPost}
                            </TextContent>

                        </div>
                        {/* <div
                        style={{
                            width: '48%', // Ajuste a largura para garantir que haja um pequeno espaço entre as divs
                            border: '1px solid black',
                            padding: '10px',
                            // minHeight: '150px',
                            maxHeight: '250px',
                            overflow: 'auto',
                        }}
                    >
                        <HighlightText text={noteData?.textPost || ''} notes={[]} />

                    </div> */}
                    </div>
                </div>
            </ModalContainer>
        </ModalOverlay >
    );
};

// Componente do botão para abrir o modal
interface ButtonNoteComponentProps {
    idPost: number;
    textPost: string
    refreshNote: () => void;
}

// const ButtonNoteComponent: React.FC<ButtonNoteComponentProps> = ({ _note }) => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [note, setNote] = useState<Note | null>(null);

//     console.log(_note);
//     const handleOpenModal = (_note) => {
//         setNote(_note);
//         setIsModalOpen(true);
//     };

//     const handleCloseModal = () => {
//         setIsModalOpen(false);
//     };

//     const handleSave = (id: number) => {
//         console.log(`Gravar dados para o ID: ${id}`);
//         // Adicionar lógica de salvamento aqui
//         handleCloseModal();
//     };

//     return (
//         <div>
//             <ButtonNote onClick={() => handleOpenModal(_note)}>
//                 <FaMarker />
//             </ButtonNote>

//             {isModalOpen && note !== null && (
//                 <Modal
//                     note={note}
//                     onSave={handleSave}
//                     onClose={handleCloseModal}
//                 />
//             )}
//         </div>
//     );
// };


const ButtonNoteComponent: React.FC<ButtonNoteComponentProps> = ({ idPost, textPost, refreshNote }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [note, setNote] = useState<Note | null>(null);

    const handleOpenModal = (idPost: number, textPost: string) => {
        // setNote(note);
        console.log(`ID do Post: ${idPost}`);
        console.log(`Texto do Post: ${textPost}`);
        setNote({ id: 0, postId: idPost, start: 0, end: 0, text: '', textPost: textPost });

        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        refreshNote();
        setIsModalOpen(false);
    };

    // const handleSave = (noteData: { text: string, start: number, end: number, postId: number, textPost: string }) => {
    //     console.log(`Gravar dados para a nota com Post ID: ${noteData.postId}`);
    //     // Lógica para salvar a nota
    //     handleCloseModal();
    // };

    return (
        <div>
            <ButtonNote onClick={() => handleOpenModal(idPost, textPost)}>
                <FaMarker />
            </ButtonNote>

            {isModalOpen && note !== null && (
                <Modal
                    note={note}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default ButtonNoteComponent;
