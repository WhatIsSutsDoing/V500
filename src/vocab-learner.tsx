import { useState, useEffect, useCallback } from "react";

// 100 words across 10 levels (10 per level), each with etymology
const WORD_BANK = [
  // ── LEVEL 1 ───────────────────────────────────────────────────────────[...]
  { level: 1, word: "Ardent", pronunciation: "/ˈɑːdənt/", partOfSpeech: "adjective", category: "Emotions", definition: "Very enthusiastic or passionate; burning with feeling.", etymology: "Lati[...]
  { level: 1, word: "Terse", pronunciation: "/tɜːs/", partOfSpeech: "adjective", category: "Social", definition: "Sparing in words; brief and direct, sometimes to the point of rudeness.", etymolo[...]
  { level: 1, word: "Placid", pronunciation: "/ˈplæsɪd/", partOfSpeech: "adjective", category: "Emotions", definition: "Not easily upset or excited; calm and peaceful.", etymology: "Latin placer[...]
  { level: 1, word: "Cogent", pronunciation: "/ˈkəʊdʒənt/", partOfSpeech: "adjective", category: "Intelligence", definition: "Clear, logical, and convincing; powerfully persuasive.", etymology[...]
  { level: 1, word: "Pristine", pronunciation: "/ˈprɪstiːn/", partOfSpeech: "adjective", category: "Perception", definition: "In its original condition; unspoiled; immaculately clean.", etymolo[...]
  { level: 1, word: "Frugal", pronunciation: "/ˈfruːɡ(ə)l/", partOfSpeech: "adjective", category: "Character", definition: "Sparing or economical with money or food; avoiding waste.", etymolog[...]
  { level: 1, word: "Stoic", pronunciation: "/ˈstəʊɪk/", partOfSpeech: "adjective", category: "Character", definition: "Enduring pain or difficulty without complaint or emotional display.", et[...]
  { level: 1, word: "Garrulous", pronunciation: "/ˈɡærʊləs/", partOfSpeech: "adjective", category: "Social", definition: "Excessively talkative, especially on trivial matters.", etymology: "L[...]
  { level: 1, word: "Sullen", pronunciation: "/ˈsʌlən/", partOfSpeech: "adjective", category: "Emotions", definition: "Bad-tempered and silently resentful; moody and withdrawn.", etymology: "An[...]
  { level: 1, word: "Dauntless", pronunciation: "/ˈdɔːntləs/", partOfSpeech: "adjective", category: "Character", definition: "Showing fearlessness and determination; impossible to intimidate."[...]

  // ── LEVEL 2 ────────────────────────────────────────────────────────────
  { level: 2, word: "Laconic", pronunciation: "/ləˈkɒnɪk/", partOfSpeech: "adjective", category: "Social", definition: "Using very few words; brief to the point of seeming rude or mysterious."[...]
  { level: 2, word: "Ennui", pronunciation: "/ˈɒnwiː/", partOfSpeech: "noun", category: "Emotions", definition: "A feeling of listlessness and dissatisfaction arising from lack of occupation or[...]
  { level: 2, word: "Wistful", pronunciation: "/ˈwɪstf(ə)l/", partOfSpeech: "adjective", category: "Emotions", definition: "Having or showing a feeling of vague or regretful longing.", etymolog[...]
  { level: 2, word: "Blithe", pronunciation: "/blʌɪð/", partOfSpeech: "adjective", category: "Emotions", definition: "Showing a casual and cheerful indifference; carefree and lighthearted.", et[...]
  { level: 2, word: "Tenuous", pronunciation: "/ˈtɛnjʊəs/", partOfSpeech: "adjective", category: "Intelligence", definition: "Very weak or slight; lacking substance; too thin to hold together.[...]
  { level: 2, word: "Volition", pronunciation: "/vəˈlɪʃ(ə)n/", partOfSpeech: "noun", category: "Character", definition: "The faculty or power of using one's will; a conscious choice or decisi[...]
  { level: 2, word: "Hapless", pronunciation: "/ˈhapləs/", partOfSpeech: "adjective", category: "Emotions", definition: "Unlucky; unfortunate; having no luck.", etymology: "Old Norse happ (luck,[...]
  { level: 2, word: "Verdant", pronunciation: "/ˈvɜːd(ə)nt/", partOfSpeech: "adjective", category: "Nature", definition: "Green with grass or other rich vegetation; lush and growing.", etymolo[...]
  { level: 2, word: "Fervent", pronunciation: "/ˈfɜːv(ə)nt/", partOfSpeech: "adjective", category: "Emotions", definition: "Having or displaying passionate intensity of feeling.", etymology: "[...]
  { level: 2, word: "Penurious", pronunciation: "/pɪˈnjʊəriəs/", partOfSpeech: "adjective", category: "Character", definition: "Extremely poor; characterized by poverty; excessively unwilling[...]

  // ── LEVEL 3 ────────────────────────────────────────────────────────────
  { level: 3, word: "Mendacious", pronunciation: "/mɛnˈdeɪʃəs/", partOfSpeech: "adjective", category: "Character", definition: "Not telling the truth; lying habitually; given to falsehood.", [...]
  { level: 3, word: "Lurid", pronunciation: "/ˈlʊərɪd/", partOfSpeech: "adjective", category: "Perception", definition: "Unpleasantly bright or vivid; sensationally shocking; ghastly in colour[...]
  { level: 3, word: "Ruminate", pronunciation: "/ˈruːmɪneɪt/", partOfSpeech: "verb", category: "Intelligence", definition: "To think deeply and at length; (of cattle) to chew the cud.", etymol[...]
  { level: 3, word: "Diaphanous", pronunciation: "/dʌɪˈæfənəs/", partOfSpeech: "adjective", category: "Perception", definition: "Light, delicate, and translucent; almost see-through.", etymo[...]
  { level: 3, word: "Trepidation", pronunciation: "/ˌtrɛpɪˈdeɪʃ(ə)n/", partOfSpeech: "noun", category: "Emotions", definition: "A feeling of fear or agitation about something that may happe[...]
  { level: 3, word: "Prodigious", pronunciation: "/prəˈdɪdʒəs/", partOfSpeech: "adjective", category: "Perception", definition: "Remarkably great in extent, size, or degree; impressively enor[...]
  { level: 3, word: "Incandescent", pronunciation: "/ˌɪnkænˈdɛs(ə)nt/", partOfSpeech: "adjective", category: "Perception", definition: "Emitting bright light as a result of intense heat; or [...]
  { level: 3, word: "Lassitude", pronunciation: "/ˈlæsɪtjuːd/", partOfSpeech: "noun", category: "Emotions", definition: "Physical or mental weariness; lack of energy; languid fatigue.", etymol[...]
  { level: 3, word: "Sanguinary", pronunciation: "/ˈsæŋɡwɪn(ə)ri/", partOfSpeech: "adjective", category: "Nature", definition: "Involving or causing much bloodshed; bloodthirsty; bloody.", e[...]
  { level: 3, word: "Tortuous", pronunciation: "/ˈtɔːtʃʊəs/", partOfSpeech: "adjective", category: "Nature", definition: "Full of twists and turns; complex and indirect; deviously intricate.[...]

  // ── LEVEL 4 ────────────────────────────────────────────────────────────
  { level: 4, word: "Ineffable", pronunciation: "/ɪnˈɛfəb(ə)l/", partOfSpeech: "adjective", category: "Perception", definition: "Too great or extreme to be expressed in words; inexpressible a[...]
  { level: 4, word: "Pernicious", pronunciation: "/pəˈnɪʃəs/", partOfSpeech: "adjective", category: "Character", definition: "Having a harmful effect, especially in a gradual or subtle way; i[...]
  { level: 4, word: "Obsequious", pronunciation: "/əbˈsiːkwɪəs/", partOfSpeech: "adjective", category: "Social", definition: "Obedient or attentive to an excessive degree; fawningly compliant[...]
  { level: 4, word: "Contrite", pronunciation: "/ˈkɒntrʌɪt/", partOfSpeech: "adjective", category: "Emotions", definition: "Feeling or expressing deep remorse; affected by guilt for having don[...]
  { level: 4, word: "Inured", pronunciation: "/ɪˈnjʊəd/", partOfSpeech: "adjective", category: "Character", definition: "Accustomed to something unpleasant through long exposure; hardened or d[...]
  { level: 4, word: "Paucity", pronunciation: "/ˈpɔːsɪti/", partOfSpeech: "noun", category: "Time", definition: "The presence of something only in small or insufficient quantities; scarcity.",[...]
  { level: 4, word: "Munificent", pronunciation: "/mjuːˈnɪfɪs(ə)nt/", partOfSpeech: "adjective", category: "Character", definition: "Very generous; larger or more elaborate than necessary; la[...]
  { level: 4, word: "Dissemble", pronunciation: "/dɪˈsɛmb(ə)l/", partOfSpeech: "verb", category: "Character", definition: "To conceal one's true motives, feelings, or beliefs; to behave hypocr[...]
  { level: 4, word: "Florid", pronunciation: "/ˈflɒrɪd/", partOfSpeech: "adjective", category: "Perception", definition: "Elaborately intricate and ornate; (of a complexion) ruddy; excessively [...]
  { level: 4, word: "Execrable", pronunciation: "/ˈɛksɪkrəb(ə)l/", partOfSpeech: "adjective", category: "Perception", definition: "Extremely bad or unpleasant; deserving to be cursed; detesta[...]

  // ── LEVEL 5 ────────────────────────────────────────────────────────────
  { level: 5, word: "Immutable", pronunciation: "/ɪˈmjuːtəb(ə)l/", partOfSpeech: "adjective", category: "Time", definition: "Unchanging over time or unable to be changed; fixed and permanent.[...]
  { level: 5, word: "Taciturn", pronunciation: "/ˈtæsɪtɜːn/", partOfSpeech: "adjective", category: "Social", definition: "Reserved or uncommunicative in speech; saying little; habitually sile[...]
  { level: 5, word: "Nugatory", pronunciation: "/ˈnjuːɡətəri/", partOfSpeech: "adjective", category: "Intelligence", definition: "Of no value or importance; useless and trifling; legally inva[...]
  { level: 5, word: "Abstruse", pronunciation: "/əbˈstruːs/", partOfSpeech: "adjective", category: "Intelligence", definition: "Difficult to understand; obscure and hard to follow; requiring de[...]
  { level: 5, word: "Hypnagogic", pronunciation: "/ˌhɪpnəˈɡɒdʒɪk/", partOfSpeech: "adjective", category: "Perception", definition: "Relating to the transitional state immediately before fa[...]
  { level: 5, word: "Inimitable", pronunciation: "/ɪˈnɪmɪtəb(ə)l/", partOfSpeech: "adjective", category: "Perception", definition: "So good or unusual as to be impossible to copy; unique and[...]
  { level: 5, word: "Cadence", pronunciation: "/ˈkeɪd(ə)ns/", partOfSpeech: "noun", category: "Art", definition: "A modulation or inflection of the voice; the beat or measure of something rhyth[...]
  { level: 5, word: "Morbid", pronunciation: "/ˈmɔːbɪd/", partOfSpeech: "adjective", category: "Emotions", definition: "Having an unusual interest in disturbing or gloomy subjects; relating to[...]
  { level: 5, word: "Surreptitious", pronunciation: "/ˌsʌrəpˈtɪʃəs/", partOfSpeech: "adjective", category: "Character", definition: "Kept secret, especially because it would not be approved[...]
  { level: 5, word: "Pell-mell", pronunciation: "/ˌpɛlˈmɛl/", partOfSpeech: "adverb/adjective", category: "Social", definition: "In a confused, rushed, or disorderly manner; headlong and reckl[...]

  // ── LEVEL 6 ────────────────────────────────────────────────────────────
  { level: 6, word: "Philippic", pronunciation: "/fɪˈlɪpɪk/", partOfSpeech: "noun", category: "Social", definition: "A bitter verbal attack or denunciation; an impassioned invective speech.", [...]
  { level: 6, word: "Obstreperous", pronunciation: "/əbˈstrɛpərəs/", partOfSpeech: "adjective", category: "Social", definition: "Noisy and difficult to control; loudly and stubbornly unruly."[...]
  { level: 6, word: "Vertiginous", pronunciation: "/vɜːˈtɪdʒɪnəs/", partOfSpeech: "adjective", category: "Perception", definition: "Causing or suffering from dizziness; extremely high or st[...]
  { level: 6, word: "Lachrymose", pronunciation: "/ˈlækrɪməʊs/", partOfSpeech: "adjective", category: "Emotions", definition: "Tearful or given to weeping; inducing tears; mournfully sentimen[...]
  { level: 6, word: "Denouement", pronunciation: "/deɪˈnuːmɒ̃/", partOfSpeech: "noun", category: "Art", definition: "The final part of a narrative in which things are resolved; the outcome of[...]
  { level: 6, word: "Recidivism", pronunciation: "/rɪˈsɪdɪvɪz(ə)m/", partOfSpeech: "noun", category: "Character", definition: "The tendency of a convicted criminal to reoffend; relapse into [...]
  { level: 6, word: "Tendentious", pronunciation: "/tɛnˈdɛnʃəs/", partOfSpeech: "adjective", category: "Intelligence", definition: "Promoting a particular cause or viewpoint; not impartial; s[...]
  { level: 6, word: "Mutable", pronunciation: "/ˈmjuːtəb(ə)l/", partOfSpeech: "adjective", category: "Time", definition: "Liable to change; inconsistent and fickle; subject to alteration.", et[...]
  { level: 6, word: "Otiose", pronunciation: "/ˈəʊʃiəʊs/", partOfSpeech: "adjective", category: "Character", definition: "Serving no practical purpose; futile and pointless; (of a person) id[...]
  { level: 6, word: "Dilatory", pronunciation: "/ˈdɪlət(ə)ri/", partOfSpeech: "adjective", category: "Time", definition: "Slow to act; intended to cause delay; habitually behind; procrastinati[...]

  // ── LEVEL 7 ────────────────────────────────────────────────────────────
  { level: 7, word: "Atavistic", pronunciation: "/ˌætəˈvɪstɪk/", partOfSpeech: "adjective", category: "Nature", definition: "Relating to reversion to something ancient or ancestral; of primi[...]
  { level: 7, word: "Uxorious", pronunciation: "/ʌkˈsɔːriəs/", partOfSpeech: "adjective", category: "Social", definition: "Having or showing an excessive or submissive fondness for one's wife[...]
  { level: 7, word: "Ignominious", pronunciation: "/ˌɪɡnəˈmɪniəs/", partOfSpeech: "adjective", category: "Social", definition: "Deserving or causing public disgrace or shame; deeply humilia[...]
  { level: 7, word: "Capricious", pronunciation: "/kəˈprɪʃəs/", partOfSpeech: "adjective", category: "Emotions", definition: "Given to sudden, unpredictable changes of mood or behaviour; impu[...]
  { level: 7, word: "Fungible", pronunciation: "/ˈfʌndʒɪb(ə)l/", partOfSpeech: "adjective", category: "Intelligence", definition: "Interchangeable; (of goods or people) able to replace or be [...]
  { level: 7, word: "Recherché", pronunciation: "/rəˈʃɛʃeɪ/", partOfSpeech: "adjective", category: "Intelligence", definition: "Rare, exotic, or obscure; overly far-fetched or unusual to be[...]
  { level: 7, word: "Sycophantic", pronunciation: "/ˌsɪkəˈfæntɪk/", partOfSpeech: "adjective", category: "Social", definition: "Behaving obsequiously toward someone powerful to gain advantag[...]
  { level: 7, word: "Persiflage", pronunciation: "/ˈpɜːsɪflɑːʒ/", partOfSpeech: "noun", category: "Social", definition: "Light and slightly contemptuous mockery or banter; frivolous, empty [...]
  { level: 7, word: "Divagate", pronunciation: "/ˈdʌɪvəɡeɪt/", partOfSpeech: "verb", category: "Intelligence", definition: "To stray from a subject; to wander or digress; to roam mentally.",[...]
  { level: 7, word: "Fulgent", pronunciation: "/ˈfʌldʒ(ə)nt/", partOfSpeech: "adjective", category: "Perception", definition: "Gleaming brilliantly; radiantly and dazzlingly bright.", etymolog[...]

  // ── LEVEL 8 ────────────────────────────────────────────────────────────
  { level: 8, word: "Apocope", pronunciation: "/əˈpɒkəpi/", partOfSpeech: "noun", category: "Intelligence", definition: "The loss or omission of one or more sounds or letters at the end of a w[...]
  { level: 8, word: "Eponymous", pronunciation: "/ɪˈpɒnɪməs/", partOfSpeech: "adjective", category: "Intelligence", definition: "Of or relating to the person after whom something is named; gi[...]
  { level: 8, word: "Hyperbole", pronunciation: "/hʌɪˈpɜːbəli/", partOfSpeech: "noun", category: "Art", definition: "Exaggerated statements not meant to be taken literally; deliberate overst[...]
  { level: 8, word: "Hiraeth", pronunciation: "/ˈhɪraɪθ/", partOfSpeech: "noun", category: "Emotions", definition: "A Welsh concept: homesickness for a home one cannot return to, or which may [...]
  { level: 8, word: "Panegyric", pronunciation: "/ˌpænɪˈdʒɪrɪk/", partOfSpeech: "noun", category: "Social", definition: "A public speech or written text in praise of someone or something; a[...]
  { level: 8, word: "Frangible", pronunciation: "/ˈfrandʒɪb(ə)l/", partOfSpeech: "adjective", category: "Perception", definition: "Fragile; easily broken; capable of being shattered or destroy[...]
  { level: 8, word: "Diapason", pronunciation: "/ˌdʌɪəˈpeɪz(ə)n/", partOfSpeech: "noun", category: "Art", definition: "The full compass of a musical instrument or voice; a rich, swelling bu[...]
  { level: 8, word: "Solecism", pronunciation: "/ˈsɒlɪsɪz(ə)m/", partOfSpeech: "noun", category: "Social", definition: "A grammatical mistake; an error in etiquette or a social blunder.", ety[...]
  { level: 8, word: "Vellichor", pronunciation: "/ˈvɛlɪkɔː/", partOfSpeech: "noun", category: "Emotions", definition: "The strange wistfulness of used bookshops; the sense that a book contain[...]

  // ── LEVEL 9 ────────────────────────────────────────────────────────────
  { level: 9, word: "Pareidolia", pronunciation: "/ˌpærɪˈdəʊliə/", partOfSpeech: "noun", category: "Intelligence", definition: "The tendency to perceive a specific, often meaningful image [...]
  { level: 9, word: "Quiddity", pronunciation: "/ˈkwɪdɪti/", partOfSpeech: "noun", category: "Intelligence", definition: "The essential nature of something; what makes a thing what it is; a tr[...]
  { level: 9, word: "Enchiridion", pronunciation: "/ˌɛnkɪˈrɪdiən/", partOfSpeech: "noun", category: "Intelligence", definition: "A handbook or manual; a small reference book for use at hand[...]
  { level: 9, word: "Syzygy", pronunciation: "/ˈsɪzɪdʒi/", partOfSpeech: "noun", category: "Nature", definition: "A straight-line configuration of three celestial bodies; the conjunction or o[...]
  { level: 9, word: "Velleity", pronunciation: "/vɛˈliːɪti/", partOfSpeech: "noun", category: "Emotions", definition: "A wish or inclination not strong enough to lead to action; the very lowe[...]
  { level: 9, word: "Tergiversate", pronunciation: "/ˈtɜːdʒɪvəseɪt/", partOfSpeech: "verb", category: "Character", definition: "To make evasive or conflicting statements; to change sides r[...]
  { level: 9, word: "Nescience", pronunciation: "/ˈnɛsiəns/", partOfSpeech: "noun", category: "Intelligence", definition: "Lack of knowledge or awareness; ignorance; the philosophical position[...]
  { level: 9, word: "Hendiadys", pronunciation: "/hɛnˈdʌɪədɪs/", partOfSpeech: "noun", category: "Art", definition: "A figure of speech in which two words joined by a conjunction express a [...]
  { level: 9, word: "Limerence", pronunciation: "/ˈlɪmərəns/", partOfSpeech: "noun", category: "Emotions", definition: "The involuntary, obsessive state of being romantically infatuated with [...]
  { level: 9, word: "Apophthegm", pronunciation: "/ˈæpəθɛm/", partOfSpeech: "noun", category: "Intelligence", definition: "A pithy, instructive saying; a concise and memorable formulation of[...]

  // ── LEVEL 10 ──────────────────────────────────────────────────────────
  { level: 10, word: "Kenopsia", pronunciation: "/kɛˈnɒpsiə/", partOfSpeech: "noun", category: "Emotions", definition: "The eerie, unsettling atmosphere of a place that is usually busy but is[...]
  { level: 10, word: "Haecceity", pronunciation: "/hɛkˈsiːɪti/", partOfSpeech: "noun", category: "Intelligence", definition: "The property that makes something the particular individual that [...]
  { level: 10, word: "Enantiodromia", pronunciation: "/ɪˌnæntiəˈdrəʊmiə/", partOfSpeech: "noun", category: "Time", definition: "The tendency of things to change into their opposites, espe[...]
  { level: 10, word: "Mimesis", pronunciation: "/mɪˈmiːsɪs/", partOfSpeech: "noun", category: "Art", definition: "Imitative representation of the world in art and literature; the action of mi[...]
  { level: 10, word: "Phronesis", pronunciation: "/frɒˈniːsɪs/", partOfSpeech: "noun", category: "Intelligence", definition: "Practical wisdom; the Aristotelian virtue of knowing how to act w[...]
  { level: 10, word: "Paracosm", pronunciation: "/ˈpærəkɒz(ə)m/", partOfSpeech: "noun", category: "Intelligence", definition: "A detailed imaginary world created by a child; an elaborate pri[...]
  { level: 10, word: "Apophasis", pronunciation: "/əˈpɒfəsɪs/", partOfSpeech: "noun", category: "Art", definition: "A rhetorical device in which one draws attention to something by claiming [...]
  { level: 10, word: "Plerosis", pronunciation: "/plɪˈrəʊsɪs/", partOfSpeech: "noun", category: "Intelligence", definition: "The process of filling in or completing; in philosophy, the reali[...]
  { level: 10, word: "Apocatastasis", pronunciation: "/ˌæpəˌkætəˈsteɪsɪs/", partOfSpeech: "noun", category: "Time", definition: "The restoration of all things to their original state; in[...]
  { level: 10, word: "Palingenesis", pronunciation: "/ˌpælɪnˈdʒɛnɪsɪs/", partOfSpeech: "noun", category: "Time", definition: "Rebirth or regeneration; the recurrence of ancestral characte[...]
  { level: 8, word: "Heterodoxy", pronunciation: "/ˈhɛtərədɒksi/", partOfSpeech: "noun", category: "Intelligence", definition: "The holding of opinions at variance with accepted or establish[...]
];

const LEVELS = Array.from({ length: 50 }, (_, i) => i + 1);

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// Generate color and label mappings dynamically
// Every 5 levels share the same color/label
const baseColors = ["#6B9E78", "#5B8FA8", "#A67C52", "#7B6FA0", "#C97B4B", "#3D7A6A", "#7A3D5C", "#4D6FA8", "#8A4D3D", "#2E2E2E"];
const baseLabels = ["Foundational", "Developing", "Expanding", "Intermediate", "Proficient", "Advanced", "Scholarly", "Erudite", "Arcane", "Lexical Mastery"];

const levelColors = Object.fromEntries(
  Array.from({ length: 50 }, (_, i) => [i + 1, baseColors[Math.floor(i / 5)]])
);

const levelLabels = Object.fromEntries(
  Array.from({ length: 50 }, (_, i) => [i + 1, baseLabels[Math.floor(i / 5)]])
);

export default function VocabLearner() {
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [mode, setMode] = useState("browse");
  const [cards, setCards] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [showEtymology, setShowEtymology] = useState(false);
  const [quizPhase, setQuizPhase] = useState("question");
  const [quizOptions, setQuizOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [showScore, setShowScore] = useState(false);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [screen, setScreen] = useState("home"); // home | learn

  const filteredWords = selectedLevel === "All"
    ? WORD_BANK
    : WORD_BANK.filter(w => w.level === Number(selectedLevel));

  const resetSession = useCallback((words) => {
    const shuffled = shuffle(words);
    setCards(shuffled);
    setCurrentIdx(0);
    setFlipped(false);
    setShowEtymology(false);
    setQuizPhase("question");
    setSelectedAnswer(null);
    setScore({ correct: 0, total: 0 });
    setShowScore(false);
    setStreak(0);
  }, []);

  const startSession = (level, m) => {
    setSelectedLevel(level);
    setMode(m);
    const words = level === "All" ? WORD_BANK : WORD_BANK.filter(w => w.level === Number(level));
    resetSession(words);
    setScreen("learn");
  };

  const current = cards[currentIdx];

  const generateOptions = useCallback((correctWord) => {
    const pool = selectedLevel === "All"
      ? WORD_BANK
      : WORD_BANK.filter(w => w.level === Number(selectedLevel));
    const distractors = shuffle(pool.filter(w => w.word !== correctWord.word)).slice(0, 3);
    return shuffle([correctWord, ...distractors]);
  }, [selectedLevel]);

  useEffect(() => {
    if (mode === "quiz" && current) {
      setQuizOptions(generateOptions(current));
    }
  }, [currentIdx, mode, current, generateOptions]);

  const nextCard = () => {
    if (currentIdx + 1 >= cards.length) {
      setShowScore(true);
    } else {
      setCurrentIdx(i => i + 1);
      setFlipped(false);
      setShowEtymology(false);
      setQuizPhase("question");
      setSelectedAnswer(null);
    }
  };

  const prevCard = () => {
    if (currentIdx > 0) {
      setCurrentIdx(i => i - 1);
      setFlipped(false);
      setShowEtymology(false);
    }
  };

  const handleAnswer = (option) => {
    if (quizPhase === "result") return;
    setSelectedAnswer(option);
    setQuizPhase("result");
    const isCorrect = option.word === current.word;
    const newStreak = isCorrect ? streak + 1 : 0;
    setStreak(newStreak);
    setBestStreak(s => Math.max(s, newStreak));
    setScore(s => ({ correct: s.correct + (isCorrect ? 1 : 0), total: s.total + 1 }));
  };

  const accent = selectedLevel === "All" ? "#2E2E2E" : levelColors[Number(selectedLevel)] || "#2E2E2E";

  // ── HOME SCREEN ─────────────────────────────────────────────────────────
  if (screen === "home") {
    return (
      <div style={{ minHeight: "100vh", background: "#F7F4EF", fontFamily: "'Georgia', serif", color: "#1A1A1A" }}>
        <div style={{ background: "#1A1A1A", padding: "24px 20px 20px" }}>
          <div style={{ color: "#F7F4EF", fontSize: "26px", fontWeight: "bold", letterSpacing: "0.5px" }}>Lexicon</div>
          <div style={{ color: "#888", fontSize: "11px", fontFamily: "sans-serif", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: "3px" }}>500 Words · 50 Levels · Etymology</div>
        </div>

        <div style={{ maxWidth: "520px", margin: "0 auto", padding: "20px 16px" }}>
          {/* Quick start all */}
          <div style={{ background: "#1A1A1A", borderRadius: "14px", padding: "20px", marginBottom: "20px", display: "flex", gap: "10px", flexDirection: "column" }}>
            <div style={{ color: "#F7C873", fontFamily: "sans-serif", fontSize: "11px", fontWeight: "700", letterSpacing: "1.5px", textTransform: "uppercase" }}>Quick Start</div>
            <div style={{ color: "#F7F4EF", fontSize: "18px", fontWeight: "bold" }}>All 500 Words</div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={() => startSession("All", "browse")} style={{ flex: 1, padding: "11px", border: "2px solid #444", borderRadius: "9px", background: "transparent", color: "#F7F4EF", cursor: "pointer", fontFamily: "sans-serif", fontSize: "14px", fontWeight: "600" }}>📖 Flashcards</button>
              <button onClick={() => startSession("All", "quiz")} style={{ flex: 1, padding: "11px", border: "none", borderRadius: "9px", background: "#F7C873", color: "#1A1A1A", cursor: "pointer", fontFamily: "sans-serif", fontSize: "14px", fontWeight: "600" }}>⚡ Quiz</button>
            </div>
          </div>

          <div style={{ fontFamily: "sans-serif", fontSize: "11px", fontWeight: "700", letterSpacing: "1.5px", textTransform: "uppercase", color: "#999", marginBottom: "12px" }}>Choose a Level</div>

          {LEVELS.map(lvl => (
            <div key={lvl} style={{ background: "#fff", borderRadius: "12px", padding: "14px 16px", marginBottom: "8px", borderLeft: `4px solid ${levelColors[lvl]}`, boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
                <div>
                  <span style={{ fontFamily: "sans-serif", fontSize: "10px", fontWeight: "700", color: levelColors[lvl], letterSpacing: "1px", textTransform: "uppercase" }}>Level {lvl}</span>
                  <div style={{ fontSize: "15px", fontWeight: "bold", marginTop: "1px" }}>{levelLabels[lvl]}</div>
                </div>
                <span style={{ fontFamily: "sans-serif", fontSize: "12px", color: "#AAA" }}>10 words</span>
              </div>
              <div style={{ display: "flex", gap: "7px" }}>
                <button onClick={() => startSession(lvl, "browse")} style={{ flex: 1, padding: "8px", border: `2px solid ${levelColors[lvl]}33`, borderRadius: "8px", background: `${levelColors[lvl]}11`, color: levelColors[lvl], cursor: "pointer", fontFamily: "sans-serif", fontSize: "13px", fontWeight: "600" }}>📖</button>
                <button onClick={() => startSession(lvl, "quiz")} style={{ flex: 1, padding: "8px", border: "none", borderRadius: "8px", background: levelColors[lvl], color: "#fff", cursor: "pointer", fontFamily: "sans-serif", fontSize: "13px", fontWeight: "600" }}>⚡</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ── LEARN SCREEN ────────────────────────────────────────────────────────
  return (
    <div style={{ minHeight: "100vh", background: "#F7F4EF", fontFamily: "'Georgia', serif", color: "#1A1A1A" }}>
      {/* Header */}
      <div style={{ background: "#1A1A1A", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
        <button onClick={() => setScreen("home")} style={{ background: "none", border: "none", color: "#888", cursor: "pointer", fontFamily: "sans-serif", fontSize: "13px", padding: "4px 0", display: "flex", alignItems: "center", gap: "4px" }}>
          ← Back
        </button>
        <div style={{ textAlign: "center" }}>
          <div style={{ color: "#F7F4EF", fontSize: "14px", fontWeight: "bold" }}>
            {selectedLevel === "All" ? "All Words" : `Level ${selectedLevel} — ${levelLabels[Number(selectedLevel)]}`}
          </div>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#F7C873", fontSize: "16px", fontWeight: "bold", fontFamily: "sans-serif" }}>{streak}</div>
            <div style={{ color: "#888", fontSize: "9px", fontFamily: "sans-serif", textTransform: "uppercase" }}>Streak</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: "#7EC8A4", fontSize: "16px", fontWeight: "bold", fontFamily: "sans-serif" }}>{bestStreak}</div>
            <div style={{ color: "#888", fontSize: "9px", fontFamily: "sans-serif", textTransform: "uppercase" }}>Best</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: "520px", margin: "0 auto", padding: "16px" }}>
        {/* Mode Toggle */}
        <div style={{ display: "flex", background: "#E8E3DB", borderRadius: "8px", padding: "3px", marginBottom: "14px", gap: "3px" }}>
          {["browse", "quiz"].map(m => (
            <button key={m} onClick={() => { setMode(m); resetSession(filteredWords); }} style={{ flex: 1, padding: "9px", border: "none", borderRadius: "6px", cursor: "pointer", fontFamily: "sans-serif", fontSize: "13px", fontWeight: "600", background: mode === m ? "#fff" : "transparent", color: mode === m ? "#1A1A1A" : "#666" }}>
              {m === "browse" ? "📖 Flashcards" : "⚡ Quiz"}
            </button>
          ))}
        </div>

        {/* Progress */}
        {!showScore && cards.length > 0 && (
          <div style={{ marginBottom: "14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "sans-serif", fontSize: "11px", color: "#888", marginBottom: "5px" }}>
              <span>{currentIdx + 1} / {cards.length}</span>
              {mode === "quiz" && <span style={{ color: accent, fontWeight: "600" }}>{score.correct}/{score.total} correct</span>}
            </div>
            <div style={{ height: "3px", background: "#DDD", borderRadius: "2px" }}>
              <div style={{ height: "100%", width: `${((currentIdx + 1) / cards.length) * 100}%`, background: accent, borderRadius: "2px", transition: "width 0.3s ease" }} />
            </div>
          </div>
        )}

        {/* Score Screen */}
        {showScore ? (
          <div style={{ background: "#fff", borderRadius: "16px", padding: "40px 24px", textAlign: "center", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>
            <div style={{ fontSize: "48px", marginBottom: "12px" }}>{mode === "quiz" ? (score.correct / score.total >= 0.8 ? "🏆" : "📚") : "✨"}</div>
            <div style={{ fontSize: "26px", fontWeight: "bold", marginBottom: "6px" }}>{mode === "quiz" ? `${score.correct} / ${score.total}` : "All Done!"}</div>
            <div style={{ color: "#666", fontFamily: "sans-serif", fontSize: "14px", marginBottom: "20px" }}>
              {mode === "quiz" ? (score.correct / score.total >= 0.8 ? "Excellent — your lexicon is growing." : "Keep reviewing and the patterns will stick.") : `You reviewed ${cards.length} words.`}
            </div>
            {mode === "quiz" && bestStreak > 1 && <div style={{ color: accent, fontFamily: "sans-serif", fontSize: "13px", marginBottom: "16px" }}>Best streak: {bestStreak} in a row 🔥</div>}
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={() => resetSession(filteredWords)} style={{ flex: 1, padding: "12px", background: "#1A1A1A", color: "#F7F4EF", border: "none", borderRadius: "8px", cursor: "pointer", fontFamily: "sans-serif", fontSize: "14px", fontWeight: "600" }}>Try Again</button>
              <button onClick={() => setScreen("home")} style={{ flex: 1, padding: "12px", background: "transparent", color: "#444", border: "2px solid #DDD", borderRadius: "8px", cursor: "pointer", fontFamily: "sans-serif", fontSize: "14px", fontWeight: "600" }}>Home</button>
            </div>
          </div>

        ) : current && mode === "browse" ? (
          <div>
            <div onClick={() => setFlipped(f => !f)} style={{ background: "#fff", borderRadius: "16px", padding: "26px 22px", minHeight: "200px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", cursor: "pointer", position: "relative" }}>
              {/* Level badge */}
              <div style={{ position: "absolute", top: "12px", right: "14px", background: `${levelColors[current.level]}22`, color: levelColors[current.level], borderRadius: "10px", padding: "2px 8px", fontFamily: "sans-serif", fontSize: "10px", fontWeight: "700" }}>
                Lv {current.level}
              </div>

              {!flipped ? (
                <div style={{ textAlign: "center", paddingTop: "16px" }}>
                  <div style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "8px", letterSpacing: "-0.5px" }}>{current.word}</div>
                  <div style={{ color: "#999", fontFamily: "sans-serif", fontSize: "13px", marginBottom: "6px" }}>{current.pronunciation}</div>
                  <div style={{ display: "inline-block", color: "#888", fontStyle: "italic", fontFamily: "sans-serif", fontSize: "11px", background: "#F5F5F5", padding: "3px 10px", borderRadius: "4px", marginBottom: "4px" }}>{current.partOfSpeech}</div>
                  <div style={{ marginTop: "28px", color: "#CCC", fontFamily: "sans-serif", fontSize: "11px", letterSpacing: "1px" }}>TAP TO REVEAL</div>
                </div>
              ) : (
                <div>
                  <div style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px" }}>{current.word}</div>
                  <div style={{ fontSize: "15px", lineHeight: "1.65", color: "#333", marginBottom: "16px" }}>{current.definition}</div>
                  <div style={{ borderLeft: `3px solid ${levelColors[current.level]}`, paddingLeft: "12px", color: "#666", fontStyle: "italic", fontSize: "13px", lineHeight: "1.6", marginBottom: "12px" }}>
                    "{current.category}"
                  </div>
                </div>
              )}
            </div>

            {/* Etymology panel */}
            {flipped && (
              <div>
                <button onClick={(e) => { e.stopPropagation(); setShowEtymology(s => !s); }} style={{ width: "100%", marginTop: "8px", padding: "10px", border: `2px solid ${levelColors[current.level]}33`, borderRadius: "10px", background: `${levelColors[current.level]}0A`, color: levelColors[current.level], cursor: "pointer", fontFamily: "sans-serif", fontSize: "13px", fontWeight: "600" }}>
                  {showEtymology ? "▲ Hide Etymology" : "🌱 Show Etymology & Roots"}
                </button>
                {showEtymology && (
                  <div style={{ background: `${levelColors[current.level]}0D`, border: `2px solid ${levelColors[current.level]}33`, borderRadius: "10px", padding: "14px 16px", marginTop: "4px" }}>
                    <div style={{ fontFamily: "sans-serif", fontSize: "10px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", color: levelColors[current.level], marginBottom: "8px" }}>Etymology</div>
                    <div style={{ fontFamily: "sans-serif", fontSize: "13px", lineHeight: "1.7", color: "#333" }}>{current.etymology}</div>
                  </div>
                )}
              </div>
            )}

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button onClick={prevCard} disabled={currentIdx === 0} style={{ flex: 1, padding: "12px", border: "2px solid #DDD", borderRadius: "10px", background: "transparent", cursor: currentIdx === 0 ? "default" : "pointer", opacity: currentIdx === 0 ? 0.5 : 1, fontFamily: "sans-serif", fontSize: "14px", fontWeight: "600", color: "#1A1A1A" }}>← Prev</button>
              <button onClick={nextCard} style={{ flex: 2, padding: "12px", border: "none", borderRadius: "10px", background: "#1A1A1A", cursor: "pointer", fontFamily: "sans-serif", fontSize: "14px", fontWeight: "600", color: "#F7F4EF" }}>Next →</button>
            </div>
          </div>

        ) : current && mode === "quiz" ? (
          <div>
            <div style={{ background: "#fff", borderRadius: "16px", padding: "24px 20px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)", marginBottom: "12px", borderTop: `5px solid ${levelColors[current.level]}` }}>
              <div style={{ fontFamily: "sans-serif", fontSize: "10px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", color: "#999", marginBottom: "10px" }}>Which word matches this definition?</div>
              <div style={{ fontSize: "16px", lineHeight: "1.65", color: "#1A1A1A", fontStyle: "italic" }}>"{current.definition}"</div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "9px", marginBottom: "12px" }}>
              {quizOptions.map((option, i) => {
                let bg = "#fff", border = "2px solid #E0DBD3", color = "#1A1A1A";
                if (quizPhase === "result") {
                  if (option.word === current.word) { bg = "#EAF7EE"; border = "2px solid #4A7C59"; color = "#2C5F38"; }
                  else if (selectedAnswer?.word === option.word) { bg = "#FBE9E7"; border = "2px solid #E07A5F"; color = "#8B2500"; }
                }
                return (
                  <button key={i} onClick={() => handleAnswer(option)} style={{ padding: "13px 16px", border, borderRadius: "10px", background: bg, cursor: quizPhase === "result" ? "default" : "pointer", fontFamily: "sans-serif", fontSize: "14px", fontWeight: "500", color, textAlign: "left", transition: "all 0.2s" }}>
                    <span style={{ display: "inline-block", width: "24px", height: "24px", borderRadius: "50%", background: "#F0EBE3", color: "#888", fontFamily: "sans-serif", fontSize: "10px", fontWeight: "700", textAlign: "center", lineHeight: "24px", marginRight: "10px" }}>{String.fromCharCode(65 + i)}</span>
                    {option.word}
                  </button>
                );
              })}
            </div>

            {quizPhase === "result" && (
              <div>
                <div style={{ background: selectedAnswer?.word === current.word ? "#EAF7EE" : "#FBE9E7", borderRadius: "10px", padding: "12px 14px", marginBottom: "10px", fontFamily: "sans-serif", fontSize: "14px", fontWeight: "600", color: selectedAnswer?.word === current.word ? "#2C5F38" : "#8B2500" }}>
                  <strong>{selectedAnswer?.word === current.word ? "✓ Correct!" : `✗ The answer was "${current.word}"`}</strong>
                  <div style={{ fontStyle: "italic", color: "#555", marginTop: "5px", fontFamily: "Georgia, serif", fontSize: "12px" }}>"{current.definition}"</div>
                </div>
                {/* Show etymology in quiz after answering */}
                <div style={{ background: `${levelColors[current.level]}0D`, border: `2px solid ${levelColors[current.level]}33`, borderRadius: "10px", padding: "12px 14px", marginBottom: "10px", fontSize: "13px" }}>
                  <div style={{ fontFamily: "sans-serif", fontSize: "9px", fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", color: levelColors[current.level], marginBottom: "6px" }}>Etymology</div>
                  <div style={{ fontFamily: "sans-serif", fontSize: "12px", lineHeight: "1.65", color: "#444" }}>{current.etymology}</div>
                </div>
                <button onClick={nextCard} style={{ width: "100%", padding: "13px", border: "none", borderRadius: "10px", background: "#1A1A1A", cursor: "pointer", fontFamily: "sans-serif", fontSize: "14px", fontWeight: "600", color: "#F7F4EF" }}>Next Question</button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
