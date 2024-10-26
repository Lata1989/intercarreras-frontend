import { useEffect, useState } from 'react';

const defaultImg = 'https://i.imgur.com/doF33wE.gif'; // img default posta
let imgConst = 'https://i.imgur.com/doF33wE.gif'; // img constante va a ser (default, calor, triste, morir, revivir)
const ImgAction = ({ actionMasc, setActionMasc }) => {
  const [actionImg, setActionImg] = useState(defaultImg);

  useEffect(() => {
    const imgActionNew = async () => {
      switch (actionMasc) {
        // ACCIONES Q DEPENDEN DE LOS BOTONES
        case 'alimentar':
          setActionImg('https://imgur.com/TCb2zZq.gif'); // animacion
          await new Promise(resolve => setTimeout(resolve, 2000));
          setActionImg(imgConst); // despues de 2 sec
          setActionMasc(null); // para q se pueda volve a ejecutar la misma accion
          break;
        case 'carinio':
          setActionImg('https://imgur.com/ZFyGt9h.gif');
          await new Promise(resolve => setTimeout(resolve, 2000));
          setActionImg(imgConst);
          setActionMasc(null);
          break;

        // ACCIONES Q DEPENDEN DEL STATUS
        case 'calor':
          // esta img va a ser temporal hasta q se deje de cumplir la condicion de calor
          imgConst = 'https://i.imgur.com/hdkvYGI.gif';
          setActionImg('https://imgur.com/hdkvYGI.gif');
          break;
        case 'triste':
          imgConst = 'https://i.imgur.com/WCIC9mN.gif';
          setActionImg(imgConst);

          break;
        case 'morir':
          imgConst = 'https://imgur.com/xl2vrO9.gif';
          setActionImg(imgConst);
          break;
        case 'revivir':
          imgConst = defaultImg;
          setActionImg(imgConst);
          break;
        case 'default':
          imgConst = defaultImg;
          setActionImg(imgConst);
          break;

        default:
          setActionImg(imgConst);
          break;
      }
    };

    imgActionNew();
  }, [actionMasc]);

  return (
    <>
      <img
        src={actionImg}
        alt="Mascota"
        style={{ width: '35rem', height: 'auto' }}
      />
    </>
  );
};

export default ImgAction;
