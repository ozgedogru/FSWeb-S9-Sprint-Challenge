import React, { useState } from "react";

// önerilen başlangıç stateleri
const initialMessage = "";
const initialEmail = "";
const initialSteps = 0;
const initialIndex = 4; //  "B" nin bulunduğu indexi

export default function AppFunctional(props) {
  // AŞAĞIDAKİ HELPERLAR SADECE ÖNERİDİR.
  // Bunları silip kendi mantığınızla sıfırdan geliştirebilirsiniz.

  let B = initialIndex;
  let x, y;

  const [message, setMessage] = useState();
  const [email, setEmail] = useState();
  const [steps, setSteps] = useState(initialSteps);
  const [index, setIndex] = useState(getXY(B));

  function getXY() {
    // Koordinatları izlemek için bir state e sahip olmak gerekli değildir.
    // Bunları hesaplayabilmek için "B" nin hangi indexte olduğunu bilmek yeterlidir.

    return `(${x}, ${y})`;
  }

  console.log(getXY());

  function getXYMesaj() {
    // Kullanıcı için "Koordinatlar (2, 2)" mesajını izlemek için bir state'in olması gerekli değildir.
    // Koordinatları almak için yukarıdaki "getXY" helperını ve ardından "getXYMesaj"ı kullanabilirsiniz.
    // tamamen oluşturulmuş stringi döndürür.
    return `Koordinatlar ${getXY()}`;
  }

  function reset() {
    // Tüm stateleri başlangıç ​​değerlerine sıfırlamak için bu helperı kullanın.
    setMessage(initialMessage);
    setEmail(initialEmail);
    setSteps(initialSteps);
    setIndex(getXY(initialIndex));
  }

  function sonrakiIndex(yon) {
    // Bu helper bir yön ("sol", "yukarı", vb.) alır ve "B" nin bir sonraki indeksinin ne olduğunu hesaplar.
    // Gridin kenarına ulaşıldığında başka gidecek yer olmadığı için,
    // şu anki indeksi değiştirmemeli.
    let yeniIndex = index;
    let yeniX = x;
    let yeniY = y;

    if (yon === "right" && x < 3) {
      yeniX += 1;
    } else if (yon === "left" && x > 1) {
      yeniX -= 1;
    } else if (yon === "up" && y < 3) {
      yeniY += 1;
    } else if (yon === "down" && y > 1) {
      yeniY -= 1;
    }
    yeniIndex = getXY(yeniX, yeniY);
    setIndex(yeniIndex);

    return `(${yeniX}, ${yeniY})`;
  }

  function ilerle(evt) {
    // Bu event handler, "B" için yeni bir dizin elde etmek üzere yukarıdaki yardımcıyı kullanabilir,
    // ve buna göre state i değiştirir.
    const yon = evt.target.id;
    setIndex(sonrakiIndex(yon));
    setSteps(steps + 1);
  }

  function onChange(evt) {
    // inputun değerini güncellemek için bunu kullanabilirsiniz.
    setEmail(evt.target.value);
  }

  function onSubmit(evt) {
    // payloadu POST etmek için bir submit handlera da ihtiyacınız var.
    evt.preventDefault();
    setMessage(email);
    console.log("Payload", { x: x, y: y, steps: steps, email: email });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Koordinatlar {index}</h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === B ? " active" : ""}`}>
            {idx === B ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={(evt) => ilerle(evt)}>
          SOL
        </button>
        <button id="up" onClick={(evt) => ilerle(evt)}>
          YUKARI
        </button>
        <button id="right" onClick={(evt) => ilerle(evt)}>
          SAĞ
        </button>
        <button id="down" onClick={(evt) => ilerle(evt)}>
          AŞAĞI
        </button>
        <button id="reset" onClick={() => reset()}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="email girin"
          onChange={onChange}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}
