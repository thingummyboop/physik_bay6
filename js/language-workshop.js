'use strict';
// Deliberate practice plus self-assessment. Written work is never auto-graded.
function buildLanguageWorkshop(topic,topicId){
 const spec=topic.workshop;if(!spec)return;
 const host=document.getElementById('sections-container');if(host.querySelector('[data-language-workshop]'))return;
 const language=topic.languageFallback?'de':(topic.contentLanguage||'de');
 const englishLabels={
  'Textwerkstatt':'Writing workshop','Werkstatt: selbst anwenden':'Workshop: apply your learning',
  'Text vorlesen lassen':'Read text aloud','Vorlesen stoppen':'Stop reading',
  'Synthetische Vorlesestimme. Höre zuerst zu und notiere Stichwörter. Du kannst den Text auch gegenseitig vorlesen.':'Synthetic reading voice. Listen first and take notes. You can also take turns reading the text aloud.',
  'Vorlesen wird von diesem Browser nicht unterstützt. Lies den Text mit einer zweiten Person: Eine liest vor, die andere hört zu.':'This browser does not support reading aloud. Work with a partner: one reads and the other listens.',
  'Hörtext zum Nachlesen':'Read the transcript','Bitte zuordnen':'Choose a match','Zuordnung prüfen':'Check matches',
  'Ordne zuerst alle Beispiele zu.':'Match all examples first.','Richtig: ':'Correct: ','Noch nicht: ':'Not yet: ',
  'Jetzt selbst anwenden':'Apply your learning','Dein Entwurf':'Your draft',
  'Entwurf in diesem Browser gespeichert.':'Draft saved in this browser.',
  'Speichern ist hier nicht möglich. Kopiere deinen Entwurf, bevor du die Seite schließt.':'Saving is unavailable here. Copy your draft before closing the page.',
  'Dein Entwurf bleibt auf diesem Gerät in diesem Browser. Er wird nicht an deine Lehrkraft gesendet und nicht automatisch benotet.':'Your draft stays in this browser on this device. It is not sent to your teacher or graded automatically.',
  'Prüfe deinen Entwurf':'Check your draft','Eine mögliche Lösung vergleichen':'Compare with one possible solution'
 };
 const translatedLabels={
  "ar": [
    "ورشة الكتابة",
    "الورشة: طبّق ما تعلمته",
    "قراءة النص بصوت عالٍ",
    "إيقاف القراءة",
    "صوت قراءة اصطناعي. استمع أولًا ودوّن كلمات مفتاحية. يمكنكما أيضًا تبادل قراءة النص بصوت عالٍ.",
    "هذا المتصفح لا يدعم القراءة بصوت عالٍ. اعمل مع شخص آخر: يقرأ أحدكما ويستمع الآخر.",
    "قراءة نص الاستماع",
    "اختر المطابقة",
    "تحقق من المطابقات",
    "طابق جميع الأمثلة أولًا.",
    "صحيح: ",
    "ليس بعد: ",
    "طبّق ما تعلمته",
    "مسودتك",
    "تم حفظ المسودة في هذا المتصفح.",
    "الحفظ غير متاح هنا. انسخ مسودتك قبل إغلاق الصفحة.",
    "تبقى مسودتك في هذا المتصفح على هذا الجهاز. لا تُرسل إلى معلمك ولا تُقيّم تلقائيًا.",
    "راجع مسودتك",
    "قارن بحل ممكن"
  ],
  "sr": [
    "Radionica pisanja",
    "Radionica: primeni naučeno",
    "Pročitaj tekst naglas",
    "Zaustavi čitanje",
    "Sintetički glas za čitanje. Prvo slušaj i zapiši ključne reči. Možete i naizmenično čitati tekst naglas.",
    "Ovaj pregledač ne podržava čitanje naglas. Radi u paru: jedna osoba čita, druga sluša.",
    "Pročitaj tekst za slušanje",
    "Izaberi par",
    "Proveri povezivanje",
    "Prvo poveži sve primere.",
    "Tačno: ",
    "Još nije tačno: ",
    "Primeni naučeno",
    "Tvoj nacrt",
    "Nacrt je sačuvan u ovom pregledaču.",
    "Čuvanje ovde nije moguće. Kopiraj nacrt pre zatvaranja stranice.",
    "Tvoj nacrt ostaje u ovom pregledaču na ovom uređaju. Ne šalje se nastavniku i ne ocenjuje se automatski.",
    "Proveri svoj nacrt",
    "Uporedi sa jednim mogućim rešenjem"
  ],
  "tr": [
    "Yazma atölyesi",
    "Atölye: öğrendiklerini uygula",
    "Metni sesli oku",
    "Okumayı durdur",
    "Yapay okuma sesi. Önce dinle ve anahtar sözcükleri not al. Metni sırayla birbirinize de okuyabilirsiniz.",
    "Bu tarayıcı sesli okumayı desteklemiyor. Bir arkadaşınla çalış: biriniz okusun, diğeriniz dinlesin.",
    "Dinleme metnini oku",
    "Eşleştirme seç",
    "Eşleştirmeleri kontrol et",
    "Önce tüm örnekleri eşleştir.",
    "Doğru: ",
    "Henüz doğru değil: ",
    "Öğrendiklerini uygula",
    "Taslağın",
    "Taslak bu tarayıcıya kaydedildi.",
    "Burada kaydetmek mümkün değil. Sayfayı kapatmadan önce taslağını kopyala.",
    "Taslağın bu cihazdaki bu tarayıcıda kalır. Öğretmenine gönderilmez ve otomatik olarak notlandırılmaz.",
    "Taslağını kontrol et",
    "Olası bir çözümle karşılaştır"
  ],
  "uk": [
    "Майстерня письма",
    "Майстерня: застосуй вивчене",
    "Прочитати текст уголос",
    "Зупинити читання",
    "Синтезований голос. Спочатку послухай і запиши ключові слова. Ви також можете по черзі читати текст уголос.",
    "Цей браузер не підтримує читання вголос. Працюй у парі: одна людина читає, інша слухає.",
    "Прочитати текст для слухання",
    "Вибери відповідність",
    "Перевірити відповідності",
    "Спочатку встанови відповідності для всіх прикладів.",
    "Правильно: ",
    "Поки що неправильно: ",
    "Застосуй вивчене",
    "Твоя чернетка",
    "Чернетку збережено в цьому браузері.",
    "Збереження тут недоступне. Скопіюй чернетку, перш ніж закривати сторінку.",
    "Твоя чернетка залишається в цьому браузері на цьому пристрої. Вона не надсилається вчителю й не оцінюється автоматично.",
    "Перевір свою чернетку",
    "Порівняй з одним із можливих розв’язків"
  ]
};
 const keys=Object.keys(englishLabels);
 const labels=language==='en'?englishLabels:Object.fromEntries(keys.map((key,i)=>[key,translatedLabels[language]?.[i]??key]));
 const translate=text=>labels[text]??text;
 const make=(tag,text)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=translate(text);return e;};
 const card=make('section');card.className='card';card.id='language-workshop';card.dataset.languageWorkshop='true';card.append(make('h2',spec.title||'Textwerkstatt'));
 const nav=host.querySelector('[data-core-navigation] ol');if(nav){const li=make('li'),link=make('a',spec.navLabel||'Werkstatt: selbst anwenden');link.href='#language-workshop';li.append(link);nav.append(li);}
 if(spec.listen){
  const listening=make('div');listening.dataset.listeningControls='true';
  const first=spec.listeningFirst?host.querySelector('[data-listening-start]'):null;
  (first||card).append(listening);
  const button=make('button','Text vorlesen lassen');button.type='button';
  const stop=make('button','Vorlesen stoppen');stop.type='button';
  const speech=window.speechSynthesis;
  if(speech&&typeof speech.speak==='function'&&typeof speech.cancel==='function'&&typeof window.SpeechSynthesisUtterance==='function'){
   const playbackStatus=make('p');playbackStatus.dataset.speechStatus='true';playbackStatus.setAttribute('role','status');playbackStatus.setAttribute('aria-live','polite');
   const failure={
    de:'Die Vorlesestimme konnte den Text nicht wiedergeben. Versuche es erneut oder öffne den Hörtext zum Nachlesen und nutze ihn als Lesealternative.',
    en:'The reading voice could not play the text. Try again, or open the transcript and use it as a reading alternative.',
    ar:'تعذّر على صوت القراءة تشغيل النص. حاول مرة أخرى، أو افتح نص الاستماع واستخدمه بديلًا للقراءة.',
    sr:'Glas za čitanje nije mogao da pročita tekst. Pokušaj ponovo ili otvori tekst za čitanje i koristi ga kao alternativu slušanju.',
    tr:'Okuma sesi metni seslendiremedi. Yeniden dene veya metni açıp okuma alternatifi olarak kullan.',
    uk:'Голос читання не зміг озвучити текст. Спробуй ще раз або відкрий текст і виконай завдання як читання.'
   }[language]||'Die Vorlesestimme konnte den Text nicht wiedergeben. Versuche es erneut oder öffne den Hörtext zum Nachlesen und nutze ihn als Lesealternative.';
   let request=0,active=false;
   const cancel=()=>{request++;if(active){active=false;try{speech.cancel();}catch{/* The transcript remains available. */}}};
   button.addEventListener('click',()=>{
    const current=++request;active=true;playbackStatus.textContent='';
    const failed=()=>{if(current!==request||!active||!listening.isConnected)return;active=false;playbackStatus.textContent=failure;};
    try{
     speech.cancel();const utterance=new window.SpeechSynthesisUtterance(spec.listen);utterance.lang=spec.voice||(language==='de'?'de-AT':language);utterance.rate=.85;
     utterance.onerror=failed;utterance.onend=()=>{if(current===request)active=false;};speech.speak(utterance);
    }catch{failed();}
   });
   stop.addEventListener('click',cancel);
   window.addEventListener('pagehide',cancel);
   document.addEventListener('visibilitychange',()=>{if(document.hidden)cancel();});
   listening.append(button,stop,make('p','Synthetische Vorlesestimme. Höre zuerst zu und notiere Stichwörter. Du kannst den Text auch gegenseitig vorlesen.'),playbackStatus);
  }
  else listening.append(make('p','Vorlesen wird von diesem Browser nicht unterstützt. Lies den Text mit einer zweiten Person: Eine liest vor, die andere hört zu.'));
  const transcript=make('details');transcript.dataset.listeningTranscript='true';transcript.append(make('summary','Hörtext zum Nachlesen'));
  const original=first?host.querySelector('[data-listening-source]'):null;
  if(original){original.before(transcript);transcript.append(original);}
  else {const text=make('p',spec.listen);text.lang=spec.voice||(language==='de'?'de':language);transcript.append(text);listening.append(transcript);}
 }
 card.append(make('p',spec.instruction));
 const items=[];
 for(const [index,item]of spec.items.entries()){
  const group=make('div');group.className='workshop-item';const label=make('label',item.text);label.htmlFor='workshop-'+index;const select=make('select');select.id=label.htmlFor;
  const empty=make('option','Bitte zuordnen');empty.value='';select.append(empty);
  spec.categories.forEach(category=>{const o=make('option',category);o.value=category;select.append(o);});
  const feedback=make('p');feedback.id=select.id+'-feedback';select.setAttribute('aria-describedby',feedback.id);group.append(label,select,feedback);items.push({item,select,feedback});card.append(group);
 }
 const check=make('button','Zuordnung prüfen');check.type='button';const status=make('p');status.setAttribute('role','status');status.setAttribute('aria-live','polite');status.setAttribute('aria-atomic','true');
 check.addEventListener('click',()=>{const empty=items.find(x=>!x.select.value);if(empty){status.textContent=translate('Ordne zuerst alle Beispiele zu.');empty.select.focus();return;}let correct=0;for(const{item,select,feedback}of items){const ok=select.value===item.answer;if(ok)correct++;feedback.textContent=translate(ok?'Richtig: ':'Noch nicht: ')+item.feedback;}status.textContent=({en:()=>`${correct} of ${items.length} matches are correct. Read the explanations and improve your choices.`,ar:()=>`${correct.toLocaleString("ar")} من ${items.length.toLocaleString("ar")} مطابقات صحيحة. اقرأ التفسيرات وحسّن اختياراتك.`,sr:()=>`${correct} od ${items.length} povezivanja je tačno. Pročitaj objašnjenja i popravi svoje izbore.`,tr:()=>`${items.length} eşleştirmeden ${correct} tanesi doğru. Açıklamaları oku ve seçimlerini düzelt.`,uk:()=>`Правильних відповідностей: ${correct} із ${items.length}. Прочитай пояснення та виправ свій вибір.`}[language]||(()=>`${correct} von ${items.length} Zuordnungen passen. Lies die Begründungen und verbessere deine Auswahl.`))();});card.append(check,status);
 const prompt=make('h3','Jetzt selbst anwenden');card.append(prompt,make('p',spec.writing));
 const label=make('label','Dein Entwurf');label.htmlFor='workshop-draft';const draft=make('textarea');draft.id=label.htmlFor;draft.rows=8;draft.maxLength=12000;draft.style.width='100%';draft.style.font='inherit';draft.style.padding='12px';
 const storageKey='sciverse_draft_'+topicId;const saveStatus=make('p');saveStatus.setAttribute('role','status');saveStatus.setAttribute('aria-live','polite');
 try{draft.value=localStorage.getItem(storageKey)||'';}catch{/* Keep editor usable without storage. */}
 let saveTimer;draft.addEventListener('input',()=>{clearTimeout(saveTimer);try{localStorage.setItem(storageKey,draft.value);saveTimer=setTimeout(()=>{saveStatus.textContent=translate('Entwurf in diesem Browser gespeichert.');},350);}catch{saveStatus.textContent=translate('Speichern ist hier nicht möglich. Kopiere deinen Entwurf, bevor du die Seite schließt.');}});
 card.append(label,draft,make('p','Dein Entwurf bleibt auf diesem Gerät in diesem Browser. Er wird nicht an deine Lehrkraft gesendet und nicht automatisch benotet.'),saveStatus);
 const rubric=make('fieldset');rubric.append(make('legend','Prüfe deinen Entwurf'));
 const reflectionText=({
  de:['Beleg oder nächster Schritt','Nenne eine Stelle in deiner Arbeit, die das Kriterium erfüllt, oder beschreibe, was du noch ändern möchtest. Häkchen und Notizen sind deine Selbsteinschätzung; sie werden nicht automatisch bewertet.','Selbsteinschätzung in diesem Browser gespeichert.','Die Selbsteinschätzung konnte nicht gespeichert werden. Kopiere deine Notizen vor dem Schließen.'],
  en:['Evidence or next step','Name a part of your work that meets the criterion, or describe what you still want to change. Checkmarks and notes are your self-assessment; they are not graded automatically.','Self-assessment saved in this browser.','Your self-assessment could not be saved. Copy your notes before closing.'],
  ar:['دليل أو خطوة تالية','اذكر جزءًا من عملك يحقق المعيار، أو صف ما تريد تغييره. العلامات والملاحظات هي تقييمك الذاتي؛ لا تُقيّم تلقائيًا.','تم حفظ التقييم الذاتي في هذا المتصفح.','تعذّر حفظ التقييم الذاتي. انسخ ملاحظاتك قبل الإغلاق.'],
  uk:['Підтвердження або наступний крок','Назви частину своєї роботи, яка відповідає критерію, або опиши, що ще хочеш змінити. Позначки й нотатки — це твоя самооцінка; вони не оцінюються автоматично.','Самооцінку збережено в цьому браузері.','Не вдалося зберегти самооцінку. Скопіюй нотатки перед закриттям.'],
  sr:['Dokaz ili sledeći korak','Navedi deo svog rada koji ispunjava kriterijum ili opiši šta još želiš da promeniš. Oznake i beleške su tvoja samoprocena; ne ocenjuju se automatski.','Samoprocena je sačuvana u ovom pregledaču.','Samoprocena nije mogla da se sačuva. Kopiraj beleške pre zatvaranja.'],
  tr:['Kanıt veya sonraki adım','Çalışmanda ölçütü karşılayan bir bölümü belirt veya hâlâ neyi değiştirmek istediğini açıkla. İşaretler ve notlar öz değerlendirmen içindir; otomatik olarak notlandırılmaz.','Öz değerlendirme bu tarayıcıya kaydedildi.','Öz değerlendirme kaydedilemedi. Kapatmadan önce notlarını kopyala.']
 }[language]||null);
 const reflectionKey=storageKey+'_reflection',reflectionRows=[];
 let previous=[];try{const value=JSON.parse(localStorage.getItem(reflectionKey)||'[]');if(Array.isArray(value))previous=value;}catch{/* A missing or damaged record never prevents editing. */}
 const reflectionStatus=make('p');reflectionStatus.setAttribute('role','status');reflectionStatus.setAttribute('aria-live','polite');
 if(reflectionText)rubric.append(make('p',reflectionText[1]));
 const saveReflection=()=>{try{localStorage.setItem(reflectionKey,JSON.stringify(reflectionRows.map(row=>({criterion:row.criterion,checked:row.input.checked,note:row.note.value}))));reflectionStatus.textContent=reflectionText?.[2]||translate('Entwurf in diesem Browser gespeichert.');}catch{reflectionStatus.textContent=reflectionText?.[3]||translate('Speichern ist hier nicht möglich. Kopiere deinen Entwurf, bevor du die Seite schließt.');}};
 spec.rubric.forEach((criterion,index)=>{
  const label=make('label');label.style.display='block';const input=make('input');input.type='checkbox';input.id='rubric-'+index;label.append(input,document.createTextNode(' '+criterion));
  const noteLabel=make('label',reflectionText?.[0]||'Beleg oder nächster Schritt');noteLabel.htmlFor='rubric-note-'+index;noteLabel.style.display='block';
  const note=make('textarea');note.id=noteLabel.htmlFor;note.rows=2;note.maxLength=2000;note.style.width='100%';note.style.font='inherit';note.dataset.rubricNote='true';note.setAttribute('aria-describedby',input.id+'-criterion');label.id=input.id+'-criterion';
  const saved=previous.find(row=>row&&row.criterion===criterion);input.checked=saved?.checked===true;note.value=typeof saved?.note==='string'?saved.note.slice(0,2000):'';
  reflectionRows.push({criterion,input,note});input.addEventListener('change',saveReflection);note.addEventListener('input',saveReflection);rubric.append(label,noteLabel,note);
 });rubric.append(reflectionStatus);card.append(rubric);
 const model=make('details');model.append(make('summary','Eine mögliche Lösung vergleichen'),make('p',spec.model));card.append(model);
 const quiz=host.querySelector('#chapter-quiz-card')?.parentElement;host.insertBefore(card,quiz||null);
}
window.buildLanguageWorkshop=buildLanguageWorkshop;
