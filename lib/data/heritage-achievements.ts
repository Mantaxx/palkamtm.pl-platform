export interface AchievementData {
    year: string;
    title: string;
    achievements: {
        level: string;
        category: string;
        position: string;
        points: string;
        contests: string;
    }[];
}

export const heritageAchievements: AchievementData[] = [
    {
        year: "2001",
        title: "Sezon 2001",
        achievements: [
            { level: "Oddział Lubań", category: "A", position: "Mistrz", points: "235,77", contests: "20" },
            { level: "Oddział Lubań", category: "B", position: "I Wicemistrz", points: "503,62", contests: "16" },
            { level: "Oddział Lubań", category: "GMO", position: "Mistrz", points: "-", contests: "-" },
            { level: "Okręg Jelenia Góra", category: "A", position: "I Wicemistrz", points: "235,77", contests: "20" },
            { level: "Okręg Jelenia Góra", category: "B", position: "IX Przodownik", points: "503,62", contests: "16" },
            { level: "Okręg Jelenia Góra", category: "GMO", position: "I Wicemistrz", points: "-", contests: "-" }
        ]
    },
    {
        year: "2002",
        title: "Sezon 2002",
        achievements: [
            { level: "Oddział Lubań", category: "A", position: "Mistrz", points: "501,52", contests: "20" },
            { level: "Oddział Lubań", category: "GMO", position: "II Wicemistrz", points: "40", contests: "-" },
            { level: "Okręg Jelenia Góra", category: "A", position: "Mistrz", points: "501,52", contests: "20" },
            { level: "Okręg Jelenia Góra", category: "GMO", position: "Mistrz", points: "40", contests: "-" },
            { level: "Region V", category: "A", position: "50 Przodownik", points: "501,52", contests: "20" },
            { level: "Region V", category: "B", position: "II Przodownik", points: "168,11", contests: "16" }
        ]
    },
    {
        year: "2003",
        title: "Sezon 2003",
        achievements: [
            { level: "Oddział Lubań", category: "A", position: "Mistrz", points: "203,54", contests: "20" },
            { level: "Oddział Lubań", category: "B", position: "Mistrz", points: "217,78", contests: "16" },
            { level: "Oddział Lubań", category: "C", position: "Mistrz", points: "71,99", contests: "9" },
            { level: "Oddział Lubań", category: "GMO", position: "Mistrz", points: "462,22", contests: "-" },
            { level: "Okręg Jelenia Góra", category: "A", position: "Mistrz", points: "203,54", contests: "20" },
            { level: "Okręg Jelenia Góra", category: "B", position: "I Wicemistrz", points: "217,78", contests: "16" },
            { level: "Okręg Jelenia Góra", category: "C", position: "Mistrz", points: "71,99", contests: "9" },
            { level: "Okręg Jelenia Góra", category: "GMO", position: "VI Przodownik", points: "462,22", contests: "-" },
            { level: "Region V", category: "A", position: "10 Przodownik", points: "203,54", contests: "20" },
            { level: "Region V", category: "B", position: "49 Przodownik", points: "217,78", contests: "16" },
            { level: "Region V", category: "C", position: "2 Miejsce", points: "971,99", contests: "-" },
            { level: "Region V", category: "D", position: "II Przodownik", points: "-", contests: "-" },
            { level: "Region V", category: "GMP", position: "11 Przodownik", points: "1066,26", contests: "-" },
            { level: "MP", category: "C", position: "13 Przodownik", points: "71,99", contests: "9" },
            { level: "MP", category: "GMP", position: "28 Przodownik", points: "1066,26", contests: "-" }
        ]
    },
    {
        year: "2004",
        title: "Sezon 2004",
        achievements: [
            { level: "Oddział Lubań", category: "A", position: "Mistrz", points: "180,91", contests: "20" },
            { level: "Oddział Lubań", category: "B", position: "Mistrz", points: "196,07", contests: "16" },
            { level: "Oddział Lubań", category: "GMO", position: "I Wicemistrz", points: "-", contests: "-" },
            { level: "Okręg Jelenia Góra", category: "A", position: "Mistrz", points: "180,91", contests: "20" },
            { level: "Okręg Jelenia Góra", category: "B", position: "I Przodownik", points: "196,07", contests: "16" },
            { level: "Okręg Jelenia Góra", category: "GMO", position: "I Przodownik", points: "-", contests: "-" },
            { level: "Region V", category: "A", position: "18 Przodownik", points: "180,91", contests: "20" },
            { level: "Region V", category: "D", position: "35 Przodownik", points: "839,32", contests: "-" },
            { level: "MP", category: "A", position: "32 Przodownik", points: "180,91", contests: "20" }
        ]
    },
    {
        year: "2005",
        title: "Sezon 2005",
        achievements: [
            { level: "Oddział Lubań", category: "A", position: "Mistrz", points: "90,65", contests: "20" },
            { level: "Oddział Lubań", category: "B", position: "Mistrz", points: "66,96", contests: "16" },
            { level: "Oddział Lubań", category: "GMO", position: "I Wicemistrz", points: "-", contests: "-" },
            { level: "Okręg Jelenia Góra", category: "A", position: "Mistrz", points: "90,65", contests: "20" },
            { level: "Okręg Jelenia Góra", category: "B", position: "Mistrz", points: "66,96", contests: "16" },
            { level: "Okręg Jelenia Góra", category: "GMO", position: "I Przodownik", points: "-", contests: "-" },
            { level: "Region V", category: "A", position: "II Wicemistrz", points: "90,65", contests: "20" },
            { level: "MP", category: "A", position: "I Przodownik", points: "90,65", contests: "20" },
            { level: "MP", category: "B", position: "V Przodownik", points: "66,96", contests: "16" }
        ]
    },
    {
        year: "2006",
        title: "Sezon 2006",
        achievements: [
            { level: "Oddział Lubań", category: "A", position: "Mistrz", points: "240,15", contests: "20" },
            { level: "Oddział Lubań", category: "B", position: "Mistrz", points: "183,25", contests: "16" },
            { level: "Oddział Lubań", category: "GMO", position: "Mistrz", points: "82,77", contests: "15" },
            { level: "Okręg Jelenia Góra", category: "A", position: "Mistrz", points: "199,28", contests: "20" },
            { level: "Okręg Jelenia Góra", category: "B", position: "II Przodownik", points: "367,51", contests: "16" },
            { level: "Okręg Jelenia Góra", category: "GMO", position: "I Wicemistrz", points: "82,77", contests: "15" },
            { level: "Region V", category: "A", position: "18 Przodownik", points: "240,15", contests: "20" },
            { level: "Region V", category: "B", position: "24 Przodownik", points: "183,25", contests: "16" },
            { level: "Region V", category: "GMO", position: "3 Przodownik", points: "82,77", contests: "15" },
            { level: "MP", category: "GMO", position: "VI Przodownik", points: "82,77", contests: "15" }
        ]
    },
    {
        year: "2007",
        title: "Sezon 2007",
        achievements: [
            { level: "Oddział Lubań", category: "A", position: "Mistrz", points: "78,06", contests: "20" },
            { level: "Oddział Lubań", category: "GMO", position: "II Wicemistrz", points: "-", contests: "-" },
            { level: "Okręg Jelenia Góra", category: "A", position: "Mistrz", points: "78,06", contests: "20" },
            { level: "Region V", category: "A", position: "II Przodownik", points: "78,06", contests: "20" },
            { level: "MP", category: "A", position: "I Przodownik", points: "78,06", contests: "20" }
        ]
    },
    {
        year: "2008",
        title: "Sezon 2008",
        achievements: [
            { level: "Oddział Lubań", category: "A", position: "Mistrz", points: "49,88", contests: "20" },
            { level: "Oddział Lubań", category: "B", position: "Mistrz", points: "158,27", contests: "16" },
            { level: "Oddział Lubań", category: "GMP", position: "I Wicemistrz", points: "49,88", contests: "-" },
            { level: "Okręg Jelenia Góra", category: "A", position: "Mistrz", points: "49,88", contests: "20" },
            { level: "Okręg Jelenia Góra", category: "B", position: "II Wicemistrz", points: "158,27", contests: "16" },
            { level: "Okręg Jelenia Góra", category: "GMP", position: "I Wicemistrz", points: "49,88", contests: "-" },
            { level: "Region V", category: "A", position: "Mistrz", points: "49,88", contests: "20" },
            { level: "Region V", category: "B", position: "XX Przodownik", points: "158,27", contests: "16" },
            { level: "Region V", category: "GMP", position: "I Wicemistrz", points: "49,88", contests: "-" },
            { level: "Region V", category: "GMP", position: "20 Przodownik", points: "158,27", contests: "-" },
            { level: "MP", category: "A", position: "3 Przodownik", points: "49,88", contests: "20" }
        ]
    },
    {
        year: "2009",
        title: "Sezon 2009",
        achievements: [
            { level: "Oddział Lubań", category: "A", position: "Mistrz", points: "82,33", contests: "20" },
            { level: "Oddział Lubań", category: "B", position: "Mistrz", points: "81,43", contests: "16" },
            { level: "Okręg Jelenia Góra", category: "A", position: "Mistrz", points: "82,33", contests: "20" },
            { level: "Okręg Jelenia Góra", category: "B", position: "Mistrz", points: "81,43", contests: "16" },
            { level: "Region V", category: "A", position: "Mistrz", points: "82,33", contests: "20" },
            { level: "Ogólnopolski", category: "GMP", position: "148 Przodownik", points: "1401,99", contests: "-" }
        ]
    },
    {
        year: "2011",
        title: "Sezon 2011",
        achievements: [
            { level: "Oddział Lubań", category: "Total dorosłych", position: "Mistrz", points: "611,73", contests: "70" },
            { level: "Oddział Lubań", category: "A", position: "Mistrz", points: "161,32", contests: "20" },
            { level: "Oddział Lubań", category: "B", position: "Mistrz", points: "51,32", contests: "16" },
            { level: "Oddział Lubań", category: "C", position: "Mistrz", points: "84,07", contests: "9" },
            { level: "Oddział Lubań", category: "M", position: "Mistrz", points: "59,36", contests: "6" },
            { level: "Oddział Lubań", category: "D", position: "Mistrz", points: "296,71", contests: "-" },
            { level: "Oddział Lubań", category: "H", position: "Mistrz", points: "588,92", contests: "18" },
            { level: "Oddział Lubań", category: "Roczne", position: "Mistrz", points: "534,49", contests: "20" },
            { level: "Okręg Jelenia Góra", category: "A", position: "Mistrz", points: "-", contests: "20" },
            { level: "Okręg Jelenia Góra", category: "B", position: "Mistrz", points: "-", contests: "16" },
            { level: "Okręg Jelenia Góra", category: "C", position: "Mistrz", points: "-", contests: "9" },
            { level: "Okręg Jelenia Góra", category: "D", position: "Mistrz", points: "-", contests: "-" },
            { level: "Okręg Jelenia Góra", category: "M", position: "Mistrz", points: "-", contests: "6" },
            { level: "Region V", category: "B", position: "Mistrz", points: "-", contests: "16" },
            { level: "Region V", category: "D", position: "Mistrz", points: "-", contests: "-" }
        ]
    },
    {
        year: "2012",
        title: "Sezon 2012",
        achievements: [
            { level: "MP", category: "Maraton", position: "8 Przodownik", points: "648,45", contests: "-" },
            { level: "MP", category: "Olimpijskie", position: "68 Przodownik", points: "847,37", contests: "-" },
            { level: "Oddział Lubań", category: "A", position: "I Mistrz", points: "575,76", contests: "20" },
            { level: "Oddział Lubań", category: "B", position: "I Mistrz", points: "160,25", contests: "16" },
            { level: "Oddział Lubań", category: "C", position: "II Wicemistrz", points: "119,72", contests: "9" },
            { level: "Oddział Lubań", category: "M Maraton", position: "I Mistrz", points: "103,06", contests: "-" },
            { level: "Oddział Lubań", category: "D", position: "I Mistrz", points: "855,28", contests: "-" },
            { level: "Oddział Lubań", category: "GMO", position: "I Mistrz", points: "1409,58", contests: "-" },
            { level: "Oddział Lubań", category: "H", position: "I Mistrz", points: "887,54", contests: "-" },
            { level: "Oddział Lubań", category: "Roczne", position: "I Mistrz", points: "413,58", contests: "20" },
            { level: "Oddział Lubań", category: "Olimpijskie", position: "I Mistrz", points: "646,45", contests: "-" },
            { level: "Oddział Lubań", category: "Total dorośli", position: "I Mistrz", points: "1080,51", contests: "-" },
            { level: "Oddział Lubań", category: "Total młodzi", position: "II Wicemistrz", points: "150,62", contests: "-" }
        ]
    },
    {
        year: "2013",
        title: "Sezon 2013",
        achievements: [
            { level: "MP", category: "B", position: "13 Przodownik", points: "685,69", contests: "16" },
            { level: "MP", category: "A", position: "II Wicemistrz", points: "66,43", contests: "20" },
            { level: "MP", category: "Roczne", position: "9 Przodownik", points: "227,84", contests: "20" },
            { level: "Region V", category: "GMP", position: "68 Przodownik", points: "1381,43", contests: "-" },
            { level: "Region V", category: "A", position: "I Wicemistrz", points: "-", contests: "20" },
            { level: "Region V", category: "B", position: "1 Przodownik", points: "-", contests: "16" },
            { level: "Region V", category: "Roczne", position: "1 Przodownik", points: "-", contests: "20" },
            { level: "Region V", category: "D", position: "3 Przodownik", points: "-", contests: "45" },
            { level: "Okręg Jelenia Góra", category: "A", position: "Mistrz", points: "-", contests: "20" },
            { level: "Okręg Jelenia Góra", category: "B", position: "Mistrz", points: "-", contests: "16" },
            { level: "Okręg Jelenia Góra", category: "H", position: "Mistrz", points: "-", contests: "18" },
            { level: "Okręg Jelenia Góra", category: "Roczne", position: "I Wicemistrz", points: "-", contests: "20" },
            { level: "Oddział Lubań", category: "A", position: "Mistrz", points: "66,43", contests: "20" },
            { level: "Oddział Lubań", category: "B", position: "Mistrz", points: "87,62", contests: "16" },
            { level: "Oddział Lubań", category: "C", position: "1 Przodownik", points: "525,46", contests: "9" },
            { level: "Oddział Lubań", category: "D", position: "Mistrz", points: "679,51", contests: "45" },
            { level: "Oddział Lubań", category: "GMO", position: "II Wicemistrz", points: "1373,93", contests: "32" },
            { level: "Oddział Lubań", category: "H", position: "Mistrz", points: "338,68", contests: "18" },
            { level: "Oddział Lubań", category: "Roczne", position: "3 Przodownik", points: "1025,61", contests: "28" },
            { level: "Oddział Lubań", category: "Total młodzi", position: "I Wicemistrz", points: "562,03", contests: "25" },
            { level: "Oddział Lubań", category: "5 najlepszych młodzi", position: "Mistrz", points: "1139,02", contests: "21" }
        ]
    },
    {
        year: "2014",
        title: "Sezon 2014",
        achievements: [
            { level: "MP", category: "B", position: "Mistrz", points: "661,38", contests: "16" },
            { level: "MP", category: "A", position: "Mistrz", points: "116,13", contests: "20" },
            { level: "MP", category: "Klasa Sport A", position: "22 Miejsce", points: "-", contests: "20" },
            { level: "Region V", category: "A", position: "Mistrz", points: "116,13", contests: "20" },
            { level: "Region V", category: "B", position: "Mistrz", points: "661,38", contests: "16" },
            { level: "Okręg Jelenia Góra", category: "A", position: "I Mistrz", points: "116,13", contests: "20" },
            { level: "Okręg Jelenia Góra", category: "B", position: "I Mistrz", points: "661,38", contests: "16" },
            { level: "Oddział Lubań", category: "A", position: "I Mistrz", points: "116,13", contests: "20" },
            { level: "Oddział Lubań", category: "B", position: "I Mistrz", points: "661,38", contests: "16" },
            { level: "Oddział Lubań", category: "C", position: "5 Przodownik", points: "362,76", contests: "9" },
            { level: "Oddział Lubań", category: "D", position: "I Mistrz", points: "557,24", contests: "-" },
            { level: "Oddział Lubań", category: "H", position: "I Mistrz", points: "577,48", contests: "-" },
            { level: "Oddział Lubań", category: "Roczne", position: "I Mistrz", points: "239,29", contests: "20" },
            { level: "Oddział Lubań", category: "Lotniki", position: "2 Przodownik", points: "524,88", contests: "-" }
        ]
    },
    {
        year: "2015",
        title: "Sezon 2015",
        achievements: [
            { level: "MP", category: "A", position: "Mistrz", points: "86,77", contests: "20" },
            { level: "MP", category: "B", position: "1 Przodownik", points: "71,68", contests: "16" },
            { level: "Region V", category: "A", position: "Mistrz", points: "86,77", contests: "20" },
            { level: "Okręg Jelenia Góra", category: "A", position: "Mistrz", points: "86,77", contests: "20" },
            { level: "Oddział Lubań", category: "A", position: "I Mistrz", points: "86,77", contests: "20" },
            { level: "Oddział Lubań", category: "B", position: "I Mistrz", points: "237,95", contests: "16" },
            { level: "Oddział Lubań", category: "C", position: "I Mistrz", points: "199,65", contests: "9" },
            { level: "Oddział Lubań", category: "D", position: "I Mistrz", points: "520,82", contests: "45" }
        ]
    },
    {
        year: "2017",
        title: "Sezon 2017",
        achievements: [
            { level: "MP", category: "GMP", position: "54 Przodownik", points: "148,16", contests: "-" },
            { level: "Oddział Lubań", category: "A", position: "1 Przodownik", points: "348,53", contests: "20" },
            { level: "Oddział Lubań", category: "B", position: "1 Przodownik", points: "153,39", contests: "16" }
        ]
    },
    {
        year: "2018",
        title: "Sezon 2018",
        achievements: [
            { level: "MP", category: "A", position: "I Wicemistrz", points: "25,94", contests: "20" },
            { level: "Region V", category: "A", position: "I Wicemistrz", points: "25,94", contests: "20" },
            { level: "Okręg Jelenia Góra", category: "A", position: "I Wicemistrz", points: "25,94", contests: "20" },
            { level: "Oddział Lubań", category: "Total", position: "16 Przodownik (XIII)", points: "942,69", contests: "-" },
            { level: "Oddział Lubań", category: "A", position: "I Wicemistrz", points: "25,94", contests: "20" },
            { level: "Oddział Lubań", category: "B", position: "I Mistrz", points: "35,74", contests: "16" }
        ]
    },
    {
        year: "2019",
        title: "Sezon 2019",
        achievements: [
            { level: "Oddział Lubań", category: "A", position: "I Mistrz", points: "82,76", contests: "-" },
            { level: "Oddział Lubań", category: "B", position: "I Mistrz", points: "130,64", contests: "-" }
        ]
    },
    {
        year: "2020",
        title: "Sezon 2020",
        achievements: [
            { level: "Oddział Kwisa", category: "A", position: "Mistrz", points: "69,22", contests: "18" },
            { level: "Oddział Kwisa", category: "B", position: "Mistrz", points: "82,03", contests: "15" },
            { level: "Oddział Kwisa", category: "C", position: "Mistrz", points: "561,95", contests: "9" },
            { level: "Oddział Kwisa", category: "D", position: "Mistrz", points: "713,20", contests: "42" },
            { level: "Okręg Jelenia Góra", category: "A", position: "3 Przodownik Nieuznane", points: "69,22", contests: "18" },
            { level: "Okręg Jelenia Góra", category: "B", position: "I V-ce Mistrz Nieuznane", points: "81,30", contests: "15" },
            { level: "Okręg Jelenia Góra", category: "C", position: "2 Przodownik Nieuznane", points: "561,95", contests: "9" },
            { level: "Okręg Jelenia Góra", category: "D", position: "Mistrz Nieuznane", points: "713,20", contests: "42" },
            { level: "Region V", category: "A", position: "I V-ce Mistrz Nieuznane", points: "63,82", contests: "18" },
            { level: "Region V", category: "B", position: "I V-ce Mistrz Nieuznane", points: "70,75", contests: "15" },
            { level: "Region V", category: "C", position: "12 Przodownik Nieuznane", points: "561,95", contests: "9" },
            { level: "Region V", category: "D", position: "7 Przodownik Nieuznane", points: "713,20", contests: "42" },
            { level: "MP", category: "A", position: "I V-ce Mistrz Nieuznane", points: "63,82", contests: "18" },
            { level: "MP", category: "B", position: "I V-ce Mistrz Nieuznane", points: "70,75", contests: "15" },
            { level: "MP", category: "C", position: "~70 Przodownik Nieuznane", points: "561,95", contests: "9" },
            { level: "MP", category: "D", position: "~50 Przodownik Nieuznane", points: "713,20", contests: "42" }
        ]
    }
];





