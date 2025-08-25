// src/data/blog.ts
export type Blog = {
  slug: string; // must match the part after /blogs/ in your links
  publishAt: string; // ISO is easiest, but we'll format anyway
  title: string;
  shortDescription: string;
  featureImage: { url: string; width: number; height: number; alt: string };
  content: string; // simple text/markdown-ish
};

export const BLOGS: Blog[] = [
  {
    slug: "Ramadan-Month-Reflection-and-Renewal",
  publishAt: "2023-10-24",
  title: "Ramadan: A Month of Reflection and Renewal",
  shortDescription: "Ramadan, the ninth month of the Islamic…",
  featureImage: {
    url: "/blog-feature-1.png",
    width: 3996,
    height: 2838,
    alt: "Ramadan feature image",
  },
  content: `
  **The Spiritual Significance of Ramadan: A Month of Reflection and Renewal.**
  
  
  Ramadan, the ninth month of the Islamic lunar calendar, is a sacred time when Muslims worldwide engage in fasting, prayer, and self-reflection. 
  
  This holy month commemorates the revelation of the Quran to Prophet Muhammad (ﷺ) and serves as a spiritual journey to purify the soul, strengthen faith, and foster empathy.
  
  
  **Fasting: A Pillar of Taqwa**
  
  Allah (SWT) emphasizes the importance of fasting in the Quran: ﴿يَا أَيُّهَا الَّذِينَ آمَنُوا كُتِبَ عَلَيْكُمُ الصِّيَامُ كَمَا كُتِبَ عَلَى الَّذِينَ مِن قَبْلِكُمْ لَعَلَّكُمْ تَتَّقُونَ﴾  
  
  "O you who believe! Fasting is prescribed for you as it was prescribed for those before you, that you may attain Taqwa (piety)." (Quran 2:183)
  
  
  Fasting cultivates self-discipline, gratitude, and compassion for the less fortunate, aligning believers with divine consciousness.
  
  
  **A Month of Spiritual Revival**
  The Prophet (ﷺ) highlighted Ramadan's transformative power: «إِذَا دَخَلَ رَمَضَانُ فُتِّحَتْ أَبْوَابُ الْجَنَّةِ، وَغُلِّقَتْ أَبْوَابُ النَّارِ، وَصُفِّدَتِ الشَّيَاطِينُ»  
  
  "When Ramadan begins, the gates of Paradise are opened, the gates of Hellfire are closed, and the devils are chained." (Sahih Bukhari 1899)
  
  
  This Hadith underscores the unique opportunity for believers to seek forgiveness, increase good deeds, and reconnect with Allah.
  
  
  **The Night of Power**
  
  Laylat al-Qadr (Night of Decree), described in the Quran, holds immense blessings: ﴿لَيْلَةُ الْقَدْرِ خَيْرٌ مِّنْ أَلْفِ شَهْرٍ﴾  
  
  "The Night of Decree is better than a thousand months." (Quran 97:3)
  
  
  Worship during this night surpasses decades of devotion, making Ramadan a gateway to eternal rewards.
  
  
  **Community and Charity**
  Ramadan fosters unity through shared iftars and Zakat. The Prophet (ﷺ) said: «مَنْ فَطَّرَ صَائِمًا كَانَ لَهُ مِثْلُ أَجْرِهِ غَيْرَ أَنَّهُ لَا يَنْقُصُ مِنْ أَجْرِ الصَّائِمِ شَيْئًا»  
  
  "Whoever feeds a fasting person will have a reward like theirs, without diminishing their reward." (Sunan Ibn Majah 1746)
  
  
  **Conclusion**
  
  Ramadan is a divine gift—a time to reset spiritually, seek forgiveness, and embody Quranic values. 
  
  Through fasting, prayer, and charity, Muslims renew their covenant with Allah, emerging with hearts purified and faith strengthened. 
  
  May this Ramadan illuminate our souls and deepen our connection to the Divine.
  `.trim(),
  
  },
  {
    slug: "Shaban-Month-Preparation-and-Spiritual",
    publishAt: "2023-11-10",
    title: "Sha'ban: A Month of Preparation and Spiritual",
    shortDescription: "Sha'ban, the eighth month of the Islamic…",
    featureImage: { url: "/blog-feature-2.png", width: 3996, height: 2838, alt: "Sha'ban feature image" },
    content: `
**The Significance of Sha'ban: A Month of Preparation and Spiritual Elevation**

Sha'ban, the eighth month of the Islamic lunar calendar, holds a unique position as the precursor to Ramadan. Often referred to as the "neglected month," Sha'ban is a time for Muslims to spiritually prepare for Ramadan and seek closeness to Allah through worship and reflection.

**1. The Prophet's Fasting in Sha'ban**

The Prophet Muhammad (ﷺ) emphasized the importance of Sha'ban by fasting extensively during this month. His wife, Aisha (RA), reported:
«كَانَ رَسُولُ اللَّهِ ﷺ يَصُومُ حَتَّى نَقُولَ لاَ يُفْطِرُ، وَيُفْطِرُ حَتَّى نَقُولَ لاَ يَصُومُ، فَمَا رَأَيْتُ رَسُولَ اللَّهِ ﷺ اسْتَكْمَلَ صِيَامَ شَهْرٍ إِلاَّ رَمَضَانَ، وَمَا رَأَيْتُهُ أَكْثَرَ صِيَامًا مِنْهُ فِي شَعْبَانَ»
"Allah's Messenger (ﷺ) used to fast till one would say he would never stop fasting, and he would abandon fasting till one would say he would never fast. I never saw him fasting for a whole month except in Ramadan, and I never saw him fasting more in any month than in Sha'ban." (Sahih Bukhari 1969)
This practice highlights Sha'ban as a time to spiritually "warm up" for Ramadan.

**2. The Night of Forgiveness (Laylat al-Bara'ah)**

The 15th night of Sha'ban, known as Laylat al-Bara'ah or the Night of Emancipation, is believed to be a blessed time when Allah's mercy descends. The Prophet (ﷺ) said:
«إِنَّ اللَّهَ لَيَطَّلِعُ فِي لَيْلَةِ النِّصْفِ مِنْ شَعْبَانَ فَيَغْفِرُ لِجَمِيعِ خَلْقِهِ إِلاَّ لِمُشْرِكٍ أَوْ مُشَاحِنٍ»
"Allah gazes at His creation on the 15th night of Sha'ban and forgives all except the idolater and one harboring hatred." (Sunan Ibn Majah 1390)
While practices vary culturally, many Muslims spend this night in prayer, seeking forgiveness and reciting the Quran.

**3. A Time for Renewing Intentions**

Sha'ban serves as a bridge between the sacred months of Rajab and Ramadan. It is a period to reflect on one's deeds, seek repentance, and set intentions for Ramadan. The Prophet (ﷺ) reminded us that deeds are presented to Allah in Sha'ban:
«ذَلِكَ شَهْرٌ يَغْفُلُ النَّاسُ عَنْهُ بَيْنَ رَجَبٍ وَرَمَضَانَ، وَهُوَ شَهْرٌ تُرْفَعُ فِيهِ الأَعْمَالُ إِلَى رَبِّ الْعَالَمِينَ، فَأُحِبُّ أَنْ يُرْفَعَ عَمَلِي وَأَنَا صَائِمٌ»
"Sha'ban is a month people neglect between Rajab and Ramadan. In it, deeds are presented to the Lord of the Worlds, so I love for my deeds to be presented while I am fasting." (Sunan an-Nasa'i 2357)

**4. Cultivating Good Habits**

Fasting in Sha'ban helps Muslims transition smoothly into Ramadan's rigorous spiritual routine. It also revives the Sunnah of the Prophet (ﷺ) and strengthens self-discipline. Voluntary charity (sadaqah), Quran recitation, and night prayers (Tahajjud) are also encouraged to maximize blessings.

** Conclusion**
Sha'ban is a golden opportunity to awaken the heart, seek forgiveness, and align one's life with divine guidance. By reviving the Sunnah of fasting and increasing worship, Muslims can enter Ramadan with a purified soul and heightened readiness to reap its rewards. Let us honor this month with gratitude and devotion, paving the way for a transformative Ramadan.
    `.trim(),
  },
  {
    slug: "Rajab-Month-Divine-Mercy-and-Awakening",
    publishAt: "2024-01-16",
    title: "Rajab: A Month of Divine Mercy and Awakening",
    shortDescription: "Rajab, the seventh month of the Islamic…",
    featureImage: { url: "/blog-feature-3.png", width: 3996, height: 2838, alt: "Rajab feature image" },
    content: `
**The Sacredness of Rajab: A Month of Divine Mercy and Spiritual Awakening**

Rajab, the seventh month of the Islamic lunar calendar, is one of the four sacred months (Al-Ashur al-Hurum) ordained by Allah. It marks a period of heightened spirituality, reflection, and preparation for the coming months of Sha'ban and Ramadan.

**1. A Sacred Month in Islam**

Allah (SWT) emphasizes the sanctity of these months in the Quran: ﴿إِنَّ عِدَّةَ الشُّهُورِ عِندَ اللَّهِ اثْنَا عَشَرَ شَهْرًا فِي كِتَابِ اللَّهِ يَوْمَ خَلَقَ السَّمَاوَاتِ وَالْأَرْضَ مِنْهَا أَرْبَعَةٌ حُرُمٌ﴾
"Indeed, the number of months ordained by Allah is twelve—in Allah's Record since the day He created the heavens and the earth—of which four are sacred." (Quran 9:36)
Rajab, along with Dhul-Qa'dah, Dhul-Hijjah, and Muharram, is a time when good deeds are multiplied, and transgressions are graver.

**2. The Month of Isra' and Mi'raj**

Rajab is traditionally associated with the Prophet's (ﷺ) miraculous Night Journey (Isra') and Ascension (Mi'raj), during which he received the commandment of the five daily prayers. Allah says:
﴿سُبْحَانَ الَّذِي أَسْرَىٰ بِعَبْدِهِ لَيْلًا مِّنَ الْمَسْجِدِ الْحَرَامِ إِلَى الْمَسْجِدِ الْأَقْصَى الَّذِي بَارَكْنَا حَوْلَهُ﴾
"Glory be to the One Who took His servant by night from the Sacred Mosque to the Farthest Mosque, whose surroundings We have blessed." (Quran 17:1)
This event underscores Allah's boundless mercy and the importance of prayer in a believer's life.

**3. Fasting and Voluntary Worship**

While fasting in Rajab is not obligatory, the Prophet (ﷺ) encouraged voluntary acts of worship during sacred months. He said: «صُمْ مِنَ الْحُرُمِ وَاتْرُكْ»
"Fast some days of the sacred months and refrain from fasting others." (Sunan Abi Dawud 2428)
Many scholars recommend **fasting, charity, and increased Quran recitation in Rajab to spiritually prepare for Ramadan.

**4. Seeking Forgiveness and Renewal**

Rajab is an ideal time to seek Allah's mercy and repent. The Prophet (ﷺ) taught this supplication as Rajab begins:
«اللَّهُمَّ بَارِكْ لَنَا فِي رَجَبَ وَشَعْبَانَ، وَبَلِّغْنَا رَمَضَانَ»
"O Allah, bless us in Rajab and Sha'ban, and let us reach Ramadan." (Musnad Ahmad 2347)
This dua reflects the believer's aspiration to purify their heart and deeds in anticipation of Ramadan.

**Conclusion**
Rajab is a divine invitation to awaken the soul, seek forgiveness, and reignite one's connection with Allah. By reviving the Sunnah of voluntary worship and reflecting on the lessons of Isra' and Mi'raj, Muslims can lay the groundwork for a fruitful spiritual journey through Sha'ban and Ramadan. Let us honor this sacred month with gratitude, devotion, and a commitment to righteousness.
    `.trim(),
  },
  {
    slug: "Shawwal-Month-Gratitude-and-Continuity",
    publishAt: "2023-03-16",
    title: "Shawwal: A Month of Gratitude and Continuity",
    shortDescription: "Shawwal emphasizes sustaining the momentum built in Ramadan…",
    featureImage: { url: "/blog-feature-4.png", width: 3996, height: 2838, alt: "Shawwal feature image" },
    content: `
The Blessings of Shawwal: A Month of Gratitude and Continuity

Shawwal, the tenth month of the Islamic lunar calendar, holds special significance as the month that follows Ramadan. It begins with the joyous celebration of Eid al-Fitr and offers believers opportunities to extend the spiritual momentum gained during Ramadan through ongoing worship and gratitude.

**1. Eid al-Fitr: A Reward for Fasting**

Shawwal opens with Eid al-Fitr, a day of celebration marking the end of Ramadan. 

The Prophet Muhammad (ﷺ) said: «لِلَّهِ عِيدَانِ: يَوْمُ الْفِطْرِ وَيَوْمُ الْأَضْحَى»
"Allah has ordained two Eids: Eid al-Fitr and Eid al-Adha." (Sunan Abi Dawud 1134)
This day is a time for communal prayers, charity (Zakat al-Fitr), and gratitude to Allah for the strength to complete Ramadan.

**2. Fasting Six Days of Shawwal: A Sunnah of Immense Reward**

The Prophet (ﷺ) emphasized the virtue of fasting six days in Shawwal:
«مَنْ صَامَ رَمَضَانَ ثُمَّ أَتْبَعَهُ سِتًّا مِنْ شَوَّالٍ كَانَ كَصِيَامِ الدَّهْرِ»
"Whoever fasts Ramadan and follows it with six days of Shawwal, it is as if they fasted for a lifetime." (Sahih Muslim 1164)
These voluntary fasts multiply rewards and demonstrate a believer's commitment to sustained worship beyond Ramadan.

**3. Cultivating Consistency in Good Deeds**

Shawwal teaches Muslims to **maintain the habits of piety** developed in Ramadan. Allah (SWT) says:
﴿وَاعْبُدْ رَبَّكَ حَتَّىٰ يَأْتِيَكَ الْيَقِينُ﴾
"Worship your Lord until certainty (death) comes to you." (Quran 15:99)
The month reminds us that worship is a lifelong journey, not confined to Ramadan alone.

**4. Strengthening Community Bonds**

Eid al-Fitr fosters unity, forgiveness, and generosity. The Prophet (ﷺ) encouraged reconciliation and kindness, stating:
«تَصَافَحُوا يَذْهَبِ الْغِلُّ، وَتَهَادَوْا تَحَابُّوا وَتَذْهَبِ الشَّحْنَاءُ»
"Shake hands, and grudges will disappear. Exchange gifts, and love will grow, and enmity will vanish." (Al-Mu'jam al-Awsat 1600)

**Conclusion**
Shawwal is a bridge between the intense devotion of Ramadan and the perseverance required in everyday faith. 

By observing its Sunnahs—celebrating Eid, fasting six days, and nurturing community ties—Muslims solidify their spiritual gains and embody the Quranic call to eternal gratitude: ﴿لِتُكَبِّرُوا اللَّهَ عَلَىٰ مَا هَدَاكُمْ وَلَعَلَّكُمْ تَشْكُرُونَ﴾
"So glorify Allah for His guidance to you, and perhaps you will be grateful." (Quran 2:185)
May Shawwal inspire us to carry Ramadan's light forward, transforming fleeting moments of worship into a lifetime of devotion.
    `.trim(),
  },
];

// helper if you need it elsewhere
export const getBlogBySlug = (slug: string) =>
  BLOGS.find((b) => b.slug === slug);
