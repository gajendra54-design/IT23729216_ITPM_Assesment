
const { test, expect } = require('@playwright/test');

test.describe('SwiftTranslator Singlish → Sinhala', () => {

  const baseURL = 'https://www.swifttranslator.com/';


  async function convertInput(page, inputText) {
    await page.goto(baseURL);

    // Fill the Singlish input box
    const textarea = page.locator('textarea[placeholder="Input Your Singlish Text Here."]');
    await textarea.fill(inputText);
    // Blur to trigger conversion (some inputs update on blur)
    await textarea.press('Tab');

    const outputLocator = page.locator('div.whitespace-pre-wrap.overflow-y-auto.bg-slate-50');
    await outputLocator.waitFor({ state: 'visible', timeout: 5000 });
    // Wait up to 12s for non-empty output; allow empty (e.g. special-chars-only input)
    try {
      await expect(outputLocator).not.toHaveText('', { timeout: 12000 });
    } catch {
      // Output stayed empty (e.g. Neg_Fun_0003 special chars) — return empty string
    }

    const actual = await outputLocator.textContent();
    return (actual || '').trim();
  }

  //Positive Functional (24 cases)
  const positiveCases = [
    { id: 'Pos_Fun_0001', input: 'mama office vaeda karanavaa', expected: 'මම office වැඩ කරනවා' },
    { id: 'Pos_Fun_0002', input: 'api heta gedhara yamu', expected: 'අපි හෙට ගෙදර යමු' },
    { id: 'Pos_Fun_0003', input: 'mama gedhara yanavaa saha passe bath kanavaa', expected: 'මම ගෙදර යනවා සහ පස්සෙ බත් කනවා' },
    { id: 'Pos_Fun_0004', input: 'oya envaa nam mama balan innavaa', expected: 'ඔය එන්වා නම් මම බලන් ඉන්නවා' },
    { id: 'Pos_Fun_0005', input: 'api iiyee class giyaa', expected: 'අපි ඊයේ class ගියා' },
    { id: 'Pos_Fun_0006', input: 'mata eeka karanna baee', expected: 'මට ඒක කරන්න බෑ' },
    { id: 'Pos_Fun_0007', input: 'oyaa adha kohomadha inne?', expected: 'ඔයා අද කොහොමද ඉන්නේ?' },
    { id: 'Pos_Fun_0008', input: 'issarahata poddak yanna', expected: 'ඉස්සරහට පොඩ්ඩක් යන්න' },
    { id: 'Pos_Fun_0009', input: 'karuNaakara mata podi udhavvak karanna puLuvandha?', expected: 'කරුණාකර මට පොඩි උදව්වක් කරන්න පුළුවන්ද?' },
    { id: 'Pos_Fun_0010', input: 'anee eeka poddak dhenna', expected: 'අනේ ඒක පොඩ්ඩක් දෙන්න' },
    { id: 'Pos_Fun_0011', input: 'suBha dhavasak!', expected: 'සුභ දවසක්!' },
    { id: 'Pos_Fun_0012', input: 'eyaalaa adha enavaa', expected: 'එයාලා අද එනවා' },
    { id: 'Pos_Fun_0013', input: 'mage meeting eka Zoom eken thiyenavaa', expected: 'mage meeting එක Zoom එකෙන් තියෙනවා' },
    { id: 'Pos_Fun_0014', input: 'api Kandy valata trip ekak yamu', expected: 'අපි Kandy වලට trip එකක් යමු' },
    { id: 'Pos_Fun_0015', input: 'WiFi eka adha vaeda karanne naehae', expected: 'WiFi එක අද වැඩ කරන්නේ නැහැ' },
    { id: 'Pos_Fun_0016', input: 'meeka Rs. 2500 k vatinavaa', expected: 'මේක Rs. 2500 ක් වටිනවා' },
    { id: 'Pos_Fun_0017', input: 'appointment eka 2026-05-21 thiyenavaa', expected: 'appointment එක 2026-05-21 තියෙනවා' },
    { id: 'Pos_Fun_0018', input: 'meeting eka 7.30 AM dha?', expected: 'meeting එක 7.30 AM ද?' },
    { id: 'Pos_Fun_0019', input: 'mama gedhara inne', expected: 'මම ගෙදර ඉන්නේ' },
    { id: 'Pos_Fun_0020', input: 'mama gedhara yanavaa. oyaa enne kavadhdha?', expected: 'මම ගෙදර යනවා. ඔයා එන්නෙ කවද්ද?' },
    { id: 'Pos_Fun_0021', input: 'mata nidhimathayi', expected: 'මට නිදිමතයි' },
    { id: 'Pos_Fun_0022', input: 'hari hari lassanai', expected: 'හරි හරි ලස්සනෛ' },
    { id: 'Pos_Fun_0023', input: 'adha api office vaeda kala saha passe manager ekka kathaa kala', expected: 'අද අපි office වැඩ කල සහ පස්සෙ manager එක්ක කතා කල' },
    { id: 'Pos_Fun_0024', input: 'hari, mama eeka karannam', expected: 'හරි, මම ඒක කරන්නම්' },
  ];

  for (const tc of positiveCases) {
    test(`${tc.id} Positive Functional`, async ({ page }) => {
      const actual = await convertInput(page, tc.input);
      expect(actual).toBe(tc.expected);
    });
  }

  //Negative Functional (10 cases)
  const negativeCases = [
  { id: 'Neg_Fun_0001', input: 'mamagedharayanavaa', correct: 'මම ගෙදර යනවා' },
  { id: 'Neg_Fun_0002', input: 'matapaanbonnaoonee', correct: 'මට පාන බොන්න ඕනේ' },
  { id: 'Neg_Fun_0003', input: 'hetaapiyanavaa', correct: 'හෙට අපි යනවා' },
  { id: 'Neg_Fun_0004', input: 'oyaaennavadha', correct: 'ඔයා එනවද?' },
  { id: 'Neg_Fun_0005', input: 'ela machan supiriii', correct: 'එල මචං සුපිරි' },
  { id: 'Neg_Fun_0006', input: 'adooo vaedak karapan', correct: 'අඩෝ වැඩක් කරපන්' },
  {
    id: 'Neg_Fun_0007',
    input: 'dhaen api vaeda karapu kaalaya athara office saha personal prashna godak thibuna nisaa api decision ekakata enna bae una',
    correct: 'දැන් අපි වැඩ කරපු කාලය අතර office සහ personal ප්‍රශ්න ගොඩක් තිබුණ නිසා අපි decision එකකට එන්න බැරි උනා'
  },
  {
    id: 'Neg_Fun_0008',
    input: 'mama gedhara yanavaa.\n\noyaa enne kavadhdha?',
    correct: 'මම ගෙදර යනවා.\n\nඔයා එන්නේ කවද්ද?'
  },
  {
    id: 'Neg_Fun_0009',
    input: 'Teams meeting eke URL eka WhatsApp karala evanna',
    correct: 'Teams meeting එකේ URL එක WhatsApp කරලා එවන්න'
  },
  {
    id: 'Neg_Fun_0010',
    input: 'QR code eka scan karala payment eka complete karanna',
    correct: 'QR code එක scan කරලා payment එක complete කරන්න'
  },
];

for (const tc of negativeCases) {
  test(`${tc.id} Negative Functional`, async ({ page }) => {
    const actual = await convertInput(page, tc.input);

    expect(actual).not.toBe(tc.correct);
  });
}

  test('Pos_UI_0001 Real-time Sinhala output updates while typing', async ({ page }) => {
    const input = 'mama gedhara yanavaa';
    await page.goto(baseURL);

    // Fill input
    await page.fill(
      'textarea[placeholder="Input Your Singlish Text Here."]',
      input
    );

    // Wait for output to update dynamically
    const outputLocator = page.locator('div.whitespace-pre-wrap.overflow-y-auto.bg-slate-50');
    await outputLocator.waitFor({ state: 'visible', timeout: 5000 });
    await expect(outputLocator).not.toHaveText('', { timeout: 5000 });

    const output = await outputLocator.textContent();

    // Expected value is correct Sinhala
    expect(output.trim()).toBe('මම ගෙදර යනවා');
  });

});
