/*====================================================
  MATH ENGINE
  Version 1.0
====================================================*/

const periodicElements = [

{
atomicNumber:1,
symbol:"H",
name:"Hydrogen",
mass:1.008,
group:1,
period:1
},

{
atomicNumber:2,
symbol:"He",
name:"Helium",
mass:4.0026,
group:18,
period:1
},

{
atomicNumber:3,
symbol:"Li",
name:"Lithium",
mass:6.94,
group:1,
period:2
},

{
atomicNumber:4,
symbol:"Be",
name:"Beryllium",
mass:9.0122,
group:2,
period:2
},

{
atomicNumber:5,
symbol:"B",
name:"Boron",
mass:10.81,
group:13,
period:2
},

{
atomicNumber:6,
symbol:"C",
name:"Carbon",
mass:12.011,
group:14,
period:2
},

{
atomicNumber:7,
symbol:"N",
name:"Nitrogen",
mass:14.007,
group:15,
period:2
},

{
atomicNumber:8,
symbol:"O",
name:"Oxygen",
mass:15.999,
group:16,
period:2
},

{
atomicNumber:9,
symbol:"F",
name:"Fluorine",
mass:18.998,
group:17,
period:2
},

{
atomicNumber:10,
symbol:"Ne",
name:"Neon",
mass:20.180,
group:18,
period:2
},

{
atomicNumber:11,
symbol:"Na",
name:"Sodium",
mass:22.990,
group:1,
period:3
},

{
atomicNumber:12,
symbol:"Mg",
name:"Magnesium",
mass:24.305,
group:2,
period:3
},

{
atomicNumber:13,
symbol:"Al",
name:"Aluminium",
mass:26.982,
group:13,
period:3
},

{
atomicNumber:14,
symbol:"Si",
name:"Silicon",
mass:28.085,
group:14,
period:3
},

{
atomicNumber:15,
symbol:"P",
name:"Phosphorus",
mass:30.974,
group:15,
period:3
},

{
atomicNumber:16,
symbol:"S",
name:"Sulfur",
mass:32.06,
group:16,
period:3
},

{
atomicNumber:17,
symbol:"Cl",
name:"Chlorine",
mass:35.45,
group:17,
period:3
},

{
atomicNumber:18,
symbol:"Ar",
name:"Argon",
mass:39.948,
group:18,
period:3
},

{
atomicNumber:19,
symbol:"K",
name:"Potassium",
mass:39.098,
group:1,
period:4
},

{
atomicNumber:20,
symbol:"Ca",
name:"Calcium",
mass:40.078,
group:2,
period:4
}

,
{
atomicNumber:21,
symbol:"Sc",
name:"Scandium",
mass:44.956,
group:3,
period:4
},
{
atomicNumber:22,
symbol:"Ti",
name:"Titanium",
mass:47.867,
group:4,
period:4
},
{
atomicNumber:23,
symbol:"V",
name:"Vanadium",
mass:50.942,
group:5,
period:4
},
{
atomicNumber:24,
symbol:"Cr",
name:"Chromium",
mass:51.996,
group:6,
period:4
},
{
atomicNumber:25,
symbol:"Mn",
name:"Manganese",
mass:54.938,
group:7,
period:4
},
{
atomicNumber:26,
symbol:"Fe",
name:"Iron",
mass:55.845,
group:8,
period:4
},
{
atomicNumber:27,
symbol:"Co",
name:"Cobalt",
mass:58.933,
group:9,
period:4
},
{
atomicNumber:28,
symbol:"Ni",
name:"Nickel",
mass:58.693,
group:10,
period:4
},
{
atomicNumber:29,
symbol:"Cu",
name:"Copper",
mass:63.546,
group:11,
period:4
},
{
atomicNumber:30,
symbol:"Zn",
name:"Zinc",
mass:65.38,
group:12,
period:4
},
{
atomicNumber:31,
symbol:"Ga",
name:"Gallium",
mass:69.723,
group:13,
period:4
},
{
atomicNumber:32,
symbol:"Ge",
name:"Germanium",
mass:72.630,
group:14,
period:4
},
{
atomicNumber:33,
symbol:"As",
name:"Arsenic",
mass:74.922,
group:15,
period:4
},
{
atomicNumber:34,
symbol:"Se",
name:"Selenium",
mass:78.971,
group:16,
period:4
},
{
atomicNumber:35,
symbol:"Br",
name:"Bromine",
mass:79.904,
group:17,
period:4
},
{
atomicNumber:36,
symbol:"Kr",
name:"Krypton",
mass:83.798,
group:18,
period:4
},
{
atomicNumber:37,
symbol:"Rb",
name:"Rubidium",
mass:85.468,
group:1,
period:5
},
{
atomicNumber:38,
symbol:"Sr",
name:"Strontium",
mass:87.62,
group:2,
period:5
},
{
atomicNumber:39,
symbol:"Y",
name:"Yttrium",
mass:88.906,
group:3,
period:5
},
{
atomicNumber:40,
symbol:"Zr",
name:"Zirconium",
mass:91.224,
group:4,
period:5
}
,
{
atomicNumber:41,
symbol:"Nb",
name:"Niobium",
mass:92.906,
group:5,
period:5
},
{
atomicNumber:42,
symbol:"Mo",
name:"Molybdenum",
mass:95.95,
group:6,
period:5
},
{
atomicNumber:43,
symbol:"Tc",
name:"Technetium",
mass:98,
group:7,
period:5
},
{
atomicNumber:44,
symbol:"Ru",
name:"Ruthenium",
mass:101.07,
group:8,
period:5
},
{
atomicNumber:45,
symbol:"Rh",
name:"Rhodium",
mass:102.91,
group:9,
period:5
},
{
atomicNumber:46,
symbol:"Pd",
name:"Palladium",
mass:106.42,
group:10,
period:5
},
{
atomicNumber:47,
symbol:"Ag",
name:"Silver",
mass:107.87,
group:11,
period:5
},
{
atomicNumber:48,
symbol:"Cd",
name:"Cadmium",
mass:112.41,
group:12,
period:5
},
{
atomicNumber:49,
symbol:"In",
name:"Indium",
mass:114.82,
group:13,
period:5
},
{
atomicNumber:50,
symbol:"Sn",
name:"Tin",
mass:118.71,
group:14,
period:5
},
{
atomicNumber:51,
symbol:"Sb",
name:"Antimony",
mass:121.76,
group:15,
period:5
},
{
atomicNumber:52,
symbol:"Te",
name:"Tellurium",
mass:127.60,
group:16,
period:5
},
{
atomicNumber:53,
symbol:"I",
name:"Iodine",
mass:126.90,
group:17,
period:5
},
{
atomicNumber:54,
symbol:"Xe",
name:"Xenon",
mass:131.29,
group:18,
period:5
},
{
atomicNumber:55,
symbol:"Cs",
name:"Caesium",
mass:132.91,
group:1,
period:6
},
{
atomicNumber:56,
symbol:"Ba",
name:"Barium",
mass:137.33,
group:2,
period:6
},
{
atomicNumber:57,
symbol:"La",
name:"Lanthanum",
mass:138.91,
group:3,
period:6
},
{
atomicNumber:58,
symbol:"Ce",
name:"Cerium",
mass:140.12,
group:3,
period:6
},
{
atomicNumber:59,
symbol:"Pr",
name:"Praseodymium",
mass:140.91,
group:3,
period:6
},
{
atomicNumber:60,
symbol:"Nd",
name:"Neodymium",
mass:144.24,
group:3,
period:6
}
,
{
atomicNumber:61,
symbol:"Pm",
name:"Promethium",
mass:145,
group:3,
period:6
},
{
atomicNumber:62,
symbol:"Sm",
name:"Samarium",
mass:150.36,
group:3,
period:6
},
{
atomicNumber:63,
symbol:"Eu",
name:"Europium",
mass:151.96,
group:3,
period:6
},
{
atomicNumber:64,
symbol:"Gd",
name:"Gadolinium",
mass:157.25,
group:3,
period:6
},
{
atomicNumber:65,
symbol:"Tb",
name:"Terbium",
mass:158.93,
group:3,
period:6
},
{
atomicNumber:66,
symbol:"Dy",
name:"Dysprosium",
mass:162.50,
group:3,
period:6
},
{
atomicNumber:67,
symbol:"Ho",
name:"Holmium",
mass:164.93,
group:3,
period:6
},
{
atomicNumber:68,
symbol:"Er",
name:"Erbium",
mass:167.26,
group:3,
period:6
},
{
atomicNumber:69,
symbol:"Tm",
name:"Thulium",
mass:168.93,
group:3,
period:6
},
{
atomicNumber:70,
symbol:"Yb",
name:"Ytterbium",
mass:173.05,
group:3,
period:6
},
{
atomicNumber:71,
symbol:"Lu",
name:"Lutetium",
mass:174.97,
group:3,
period:6
},
{
atomicNumber:72,
symbol:"Hf",
name:"Hafnium",
mass:178.49,
group:4,
period:6
},
{
atomicNumber:73,
symbol:"Ta",
name:"Tantalum",
mass:180.95,
group:5,
period:6
},
{
atomicNumber:74,
symbol:"W",
name:"Tungsten",
mass:183.84,
group:6,
period:6
},
{
atomicNumber:75,
symbol:"Re",
name:"Rhenium",
mass:186.21,
group:7,
period:6
},
{
atomicNumber:76,
symbol:"Os",
name:"Osmium",
mass:190.23,
group:8,
period:6
},
{
atomicNumber:77,
symbol:"Ir",
name:"Iridium",
mass:192.22,
group:9,
period:6
},
{
atomicNumber:78,
symbol:"Pt",
name:"Platinum",
mass:195.08,
group:10,
period:6
},
{
atomicNumber:79,
symbol:"Au",
name:"Gold",
mass:196.97,
group:11,
period:6
},
{
atomicNumber:80,
symbol:"Hg",
name:"Mercury",
mass:200.59,
group:12,
period:6
}
,
{
atomicNumber:81,
symbol:"Tl",
name:"Thallium",
mass:204.38,
group:13,
period:6
},
{
atomicNumber:82,
symbol:"Pb",
name:"Lead",
mass:207.2,
group:14,
period:6
},
{
atomicNumber:83,
symbol:"Bi",
name:"Bismuth",
mass:208.98,
group:15,
period:6
},
{
atomicNumber:84,
symbol:"Po",
name:"Polonium",
mass:209,
group:16,
period:6
},
{
atomicNumber:85,
symbol:"At",
name:"Astatine",
mass:210,
group:17,
period:6
},
{
atomicNumber:86,
symbol:"Rn",
name:"Radon",
mass:222,
group:18,
period:6
},
{
atomicNumber:87,
symbol:"Fr",
name:"Francium",
mass:223,
group:1,
period:7
},
{
atomicNumber:88,
symbol:"Ra",
name:"Radium",
mass:226,
group:2,
period:7
},
{
atomicNumber:89,
symbol:"Ac",
name:"Actinium",
mass:227,
group:3,
period:7
},
{
atomicNumber:90,
symbol:"Th",
name:"Thorium",
mass:232.04,
group:3,
period:7
}
,
{
atomicNumber:91,
symbol:"Pa",
name:"Protactinium",
mass:231.04,
group:3,
period:7
},
{
atomicNumber:92,
symbol:"U",
name:"Uranium",
mass:238.03,
group:3,
period:7
},
{
atomicNumber:93,
symbol:"Np",
name:"Neptunium",
mass:237,
group:3,
period:7
},
{
atomicNumber:94,
symbol:"Pu",
name:"Plutonium",
mass:244,
group:3,
period:7
},
{
atomicNumber:95,
symbol:"Am",
name:"Americium",
mass:243,
group:3,
period:7
},
{
atomicNumber:96,
symbol:"Cm",
name:"Curium",
mass:247,
group:3,
period:7
},
{
atomicNumber:97,
symbol:"Bk",
name:"Berkelium",
mass:247,
group:3,
period:7
}
,
{
atomicNumber:98,
symbol:"Cf",
name:"Californium",
mass:251,
group:3,
period:7
},
{
atomicNumber:99,
symbol:"Es",
name:"Einsteinium",
mass:252,
group:3,
period:7
},
{
atomicNumber:100,
symbol:"Fm",
name:"Fermium",
mass:257,
group:3,
period:7
},
{
atomicNumber:101,
symbol:"Md",
name:"Mendelevium",
mass:258,
group:3,
period:7
},
{
atomicNumber:102,
symbol:"No",
name:"Nobelium",
mass:259,
group:3,
period:7
},
{
atomicNumber:103,
symbol:"Lr",
name:"Lawrencium",
mass:266,
group:3,
period:7
},
{
atomicNumber:104,
symbol:"Rf",
name:"Rutherfordium",
mass:267,
group:4,
period:7
},
{
atomicNumber:105,
symbol:"Db",
name:"Dubnium",
mass:268,
group:5,
period:7
}
,
{
atomicNumber:106,
symbol:"Sg",
name:"Seaborgium",
mass:269,
group:6,
period:7
},
{
atomicNumber:107,
symbol:"Bh",
name:"Bohrium",
mass:270,
group:7,
period:7
}
,
{
atomicNumber:108,
symbol:"Hs",
name:"Hassium",
mass:269,
group:8,
period:7
},
{
atomicNumber:109,
symbol:"Mt",
name:"Meitnerium",
mass:278,
group:9,
period:7
},
{
atomicNumber:110,
symbol:"Ds",
name:"Darmstadtium",
mass:281,
group:10,
period:7
},
{
atomicNumber:111,
symbol:"Rg",
name:"Roentgenium",
mass:282,
group:11,
period:7
},
{
atomicNumber:112,
symbol:"Cn",
name:"Copernicium",
mass:285,
group:12,
period:7
}
,
{
atomicNumber:113,
symbol:"Nh",
name:"Nihonium",
mass:286,
group:13,
period:7
},
{
atomicNumber:114,
symbol:"Fl",
name:"Flerovium",
mass:289,
group:14,
period:7
},
{
atomicNumber:115,
symbol:"Mc",
name:"Moscovium",
mass:290,
group:15,
period:7
},
{
atomicNumber:116,
symbol:"Lv",
name:"Livermorium",
mass:293,
group:16,
period:7
},
{
atomicNumber:117,
symbol:"Ts",
name:"Tennessine",
mass:294,
group:17,
period:7
},
{
atomicNumber:118,
symbol:"Og",
name:"Oganesson",
mass:294,
group:18,
period:7
}
];

const config = [];

config[1] = "1s1";
config[2] = "1s2";
config[3] = "1s2 2s1"; // Li
config[4] = "1s2 2s2"; // Be
config[5] = "1s2 2s2 2p1"; // B
config[6] = "1s2 2s2 2p2"; // C
config[7] = "1s2 2s2 2p3"; // N
config[8] = "1s2 2s2 2p4"; // O
config[9] = "1s2 2s2 2p5"; // F
config[10] = "1s2 2s2 2p6"; // Ne
config[11] = "1s2 2s2 2p6 3s1";
config[12] = "1s2 2s2 2p6 3s2";
config[13] = "1s2 2s2 2p6 3s2 3p1";
config[14] = "1s2 2s2 2p6 3s2 3p2";
config[15] = "1s2 2s2 2p6 3s2 3p3";
config[16] = "1s2 2s2 2p6 3s2 3p4";   // S
config[17] = "1s2 2s2 2p6 3s2 3p5";   // Cl
config[18] = "1s2 2s2 2p6 3s2 3p6";   // Ar
config[19] = "1s2 2s2 2p6 3s2 3p6 4s1"; // K
config[20] = "1s2 2s2 2p6 3s2 3p6 4s2"; // Ca
config[21] = "1s2 2s2 2p6 3s2 3p6 4s2 3d1"; // Sc
config[22] = "1s2 2s2 2p6 3s2 3p6 4s2 3d2"; // Ti
config[23] = "1s2 2s2 2p6 3s2 3p6 4s2 3d3"; // V
config[24] = "1s2 2s2 2p6 3s2 3p6 4s1 3d5"; // Cr
config[25] = "1s2 2s2 2p6 3s2 3p6 4s2 3d5"; // Mn
config[26] = "1s2 2s2 2p6 3s2 3p6 4s2 3d6"; // Fe
config[27] = "1s2 2s2 2p6 3s2 3p6 4s2 3d7"; // Co
config[28] = "1s2 2s2 2p6 3s2 3p6 4s2 3d8"; // Ni
config[29] = "1s2 2s2 2p6 3s2 3p6 4s1 3d10"; // Cu
config[30] = "1s2 2s2 2p6 3s2 3p6 4s2 3d10"; // Zn

config[31] = "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p1"; // Ga
config[32] = "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p2"; // Ge
config[33] = "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p3"; // As
config[34] = "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p4"; // Se
config[35] = "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p5"; // Br
config[36] = "1s2 2s2 2p6 3s2 3p6 4s2 3d10 4p6"; // Kr

config[37] = "[Kr] 5s1"; // Rb
config[38] = "[Kr] 5s2"; // Sr
config[39] = "[Kr] 5s2 4d1"; // Y
config[40] = "[Kr] 5s2 4d2"; // Zr
config[41] = "[Kr] 5s1 4d4"; // Nb
config[42] = "[Kr] 5s1 4d5"; // Mo
config[43] = "[Kr] 5s2 4d5"; // Tc
config[44] = "[Kr] 5s1 4d7"; // Ru
config[45] = "[Kr] 5s1 4d8"; // Rh
config[46] = "[Kr] 4d10"; // Pd

config[47] = "[Kr] 5s1 4d10"; // Ag
config[48] = "[Kr] 5s2 4d10"; // Cd
config[49] = "[Kr] 5s2 4d10 5p1"; // In
config[50] = "[Kr] 5s2 4d10 5p2"; // Sn
config[51] = "[Kr] 5s2 4d10 5p3"; // Sb
config[52] = "[Kr] 5s2 4d10 5p4"; // Te
config[53] = "[Kr] 5s2 4d10 5p5"; // I
config[54] = "[Kr] 5s2 4d10 5p6"; // Xe

config[55] = "[Xe] 6s1"; // Cs
config[56] = "[Xe] 6s2"; // Ba
config[57] = "[Xe] 6s2 5d1"; // La
config[58] = "[Xe] 6s2 4f1 5d1"; // Ce
config[59] = "[Xe] 6s2 4f3"; // Pr
config[60] = "[Xe] 6s2 4f4"; // Nd
config[61] = "[Xe] 6s2 4f5"; // Pm
config[62] = "[Xe] 6s2 4f6"; // Sm
config[63] = "[Xe] 6s2 4f7"; // Eu
config[64] = "[Xe] 6s2 4f7 5d1"; // Gd
config[65] = "[Xe] 6s2 4f9"; // Tb
config[66] = "[Xe] 6s2 4f10"; // Dy
config[67] = "[Xe] 6s2 4f11"; // Ho
config[68] = "[Xe] 6s2 4f12"; // Er
config[69] = "[Xe] 6s2 4f13"; // Tm
config[70] = "[Xe] 6s2 4f14"; // Yb
config[71] = "[Xe] 6s2 4f14 5d1"; // Lu
config[72] = "[Xe] 6s2 4f14 5d2"; // Hf
config[73] = "[Xe] 6s2 4f14 5d3"; // Ta
config[74] = "[Xe] 6s2 4f14 5d4"; // W
config[75] = "[Xe] 6s2 4f14 5d5"; // Re
config[76] = "[Xe] 6s2 4f14 5d6"; // Os
config[77] = "[Xe] 6s2 4f14 5d7"; // Ir
config[78] = "[Xe] 6s1 4f14 5d9"; // Pt
config[79] = "[Xe] 6s1 4f14 5d10"; // Au
config[80] = "[Xe] 6s2 4f14 5d10"; // Hg

config[81] = "[Xe] 6s2 4f14 5d10 6p1"; // Tl
config[82] = "[Xe] 6s2 4f14 5d10 6p2"; // Pb
config[83] = "[Xe] 6s2 4f14 5d10 6p3"; // Bi
config[84] = "[Xe] 6s2 4f14 5d10 6p4"; // Po
config[85] = "[Xe] 6s2 4f14 5d10 6p5"; // At
config[86] = "[Xe] 6s2 4f14 5d10 6p6"; // Rn

config[87] = "[Rn] 7s1"; // Fr
config[88] = "[Rn] 7s2"; // Ra
config[89] = "[Rn] 7s2 6d1"; // Ac
config[90] = "[Rn] 7s2 6d2"; // Th
config[91] = "[Rn] 7s2 5f2 6d1"; // Pa
config[92] = "[Rn] 7s2 5f3 6d1"; // U
config[93] = "[Rn] 7s2 5f4 6d1"; // Np
config[94] = "[Rn] 7s2 5f6"; // Pu
config[95] = "[Rn] 7s2 5f7"; // Am
config[96] = "[Rn] 7s2 5f7 6d1"; // Cm
config[97] = "[Rn] 7s2 5f9"; // Bk
config[98] = "[Rn] 7s2 5f10"; // Cf
config[99] = "[Rn] 7s2 5f11"; // Es
config[100] = "[Rn] 7s2 5f12"; // Fm
config[101] = "[Rn] 7s2 5f13"; // Md
config[102] = "[Rn] 7s2 5f14"; // No
config[103] = "[Rn] 7s2 5f14 6d1"; // Lr

config[104] = "[Rn] 7s2 5f14 6d2"; // Rf
config[105] = "[Rn] 7s2 5f14 6d3"; // Db
config[106] = "[Rn] 7s2 5f14 6d4"; // Sg
config[107] = "[Rn] 7s2 5f14 6d5"; // Bh
config[108] = "[Rn] 7s2 5f14 6d6"; // Hs
config[109] = "[Rn] 7s2 5f14 6d7"; // Mt
config[110] = "[Rn] 7s2 5f14 6d8"; // Ds
config[111] = "[Rn] 7s2 5f14 6d9"; // Rg
config[112] = "[Rn] 7s2 5f14 6d10"; // Cn

config[113] = "[Rn] 7s2 5f14 6d10 7p1"; // Nh
config[114] = "[Rn] 7s2 5f14 6d10 7p2"; // Fl
config[115] = "[Rn] 7s2 5f14 6d10 7p3"; // Mc
config[116] = "[Rn] 7s2 5f14 6d10 7p4"; // Lv
config[117] = "[Rn] 7s2 5f14 6d10 7p5"; // Ts
config[118] = "[Rn] 7s2 5f14 6d10 7p6"; // Og
function mainMenu(){

    let choice = prompt(
`OP3CALCULATE

1 = Calculate
2 = Solver
3 = Statistics
4 = Matrix
5 = Vector
6 = Complex
7 = Graph
8 = Table
9 = Base-N
10 = Number Theory
11 = Chemistry

Enter choice:`);

    switch(choice){

        case "1":
            break;

        case "2":
            solverMenu();
            break;

        case "3":
            statisticsMenu();
            break;

        case "4":
            matrixMenu();
            break;

        case "5":
            vectorMenu();
            break;

        case "6":
            complexMenu();
            break;

        case "7":
            graphMenu();
            break;

        case "8":
            tableMenu();
            break;

        case "9":
            baseMenu();
            break;

        case "10":
            numberTheoryMenu();
            break;
        case "11":
        chemistryMenu();
            break;
        

    }

}
/*=========================================
        LIVE RESULT PREVIEW
=========================================*/

function updatePreview(){

    const preview =
    document.getElementById("previewDisplay");

    if(display.value.trim() === ""){

        preview.textContent = "";

        return;

    }

    try{

        let expression = display.value;

        expression = expression.replace(/\bi\b/g,"1i");

        expression = expression.replace(
            /(\d+(\.\d+)?)%/g,
            (_,n)=>"(" + Number(n)/100 + ")"
        );

        if(degreeMode){

            expression = expression.replace(
                /sin\(([^()]*)\)/g,
                "sin(($1)*pi/180)"
            );

            expression = expression.replace(
                /cos\(([^()]*)\)/g,
                "cos(($1)*pi/180)"
            );

            expression = expression.replace(
                /tan\(([^()]*)\)/g,
                "tan(($1)*pi/180)"
            );

        }

        const result =
        math.evaluate(expression);

        preview.textContent =
        "= " + math.format(result,{
            precision:12
        });

    }

    catch{

        preview.textContent = "";

    }

}
function smartPreview(){

    try{

        
switch(currentMode){

    case "NORMAL":
        normalPreview();
        break;

    case "FACTORIAL":
        previewFactorial();
        break;

            
            case "DIFFERENTIATE":
                previewDerivative();
                break;

            case "INTEGRATE":
                previewIntegral();
                break;

            case "SOLVER":
                previewSolver();
                break;

            case "MATRIX":
                previewMatrix();
                break;

            case "VECTOR":
                previewVector();
                break;

            case "STATISTICS":
                previewStatistics();
                break;

            case "GRAPH":
                previewGraph();
                break;

            case "COMPLEX":
                previewComplex();
                break;

            case "CHEMISTRY":
                previewChemistry();
                break;

            case "NUMBER_THEORY":
                previewNumberTheory();
                break;

            case "BASE":
                previewBase();
                break;

            case "REGRESSION":
                previewRegression();
                break;

            case "TABLE":
                previewTable();
                break;

            case "CAS":
                previewCAS();
                break;

            default:
            normalPreview();

        }

    }

    catch(error){

        previewDisplay.textContent="";

    }

}
function normalPreview(){

    if(display.value.trim()==""){
        previewDisplay.textContent="";
        return;
    }

    try{

        let expression = display.value;

        expression = expression.replace(/√\(/g,"sqrt(");
        expression = expression.replace(/\bi\b/g,"1i");

        expression = expression.replace(
            /(\d+(\.\d+)?)%/g,
            (_,n)=>"(" + Number(n)/100 + ")"
        );

        let result = math.evaluate(expression);

        previewDisplay.textContent =
        "= " + math.format(result,{
            precision:12
        });

    }

    catch{

        previewDisplay.textContent="";

    }

}
function previewDerivative(){

    try{

        let input=display.value.split(",");

        if(input.length!==2){

            previewDisplay.textContent="";
            return;

        }

        let expression=input[0];

        let x=Number(input[1]);

        if(isNaN(x)){

            previewDisplay.textContent="";
            return;

        }

        let h=0.00001;

        let f1=math.evaluate(expression,{x:x+h});

        let f2=math.evaluate(expression,{x:x-h});

        let result=(f1-f2)/(2*h);

        result=Math.round(result*1e10)/1e10;

        if(Math.abs(result-Math.round(result))<1e-10){

            result=Math.round(result);

        }

        previewDisplay.textContent="≈ "+result;

    }

    catch{

        previewDisplay.textContent="";

    }

}
/*=========================================
        UNIVERSAL RESULT PREVIEW
=========================================*/

function setPreview(result){

    const preview = document.getElementById("previewDisplay");

    preview.style.opacity = "0";

    setTimeout(function(){

        preview.textContent = "= " + result;

        preview.style.opacity = "1";

    },120);

}
function applyPreview(){

    const preview = document.getElementById("previewDisplay");

    if(preview.textContent !== ""){

        display.value = preview.textContent.replace(/^=\s*/,"");

    }

}
function updateModeIndicator(){

    document.getElementById("modeIndicator").textContent =
        degreeMode ? "DEG" : "RAD";

}

function updateMemoryIndicator(){

    const indicator = document.getElementById("memoryIndicator");

    if (indicator) {
        indicator.textContent = memory !== 0 ? "M" : "";
    }

}
function primeFactorization(){

    let n = parseInt(prompt("Enter an integer ="));

    if(isNaN(n) || n < 2){

        alert("Invalid input.");
        return;

    }

    let factors = [];

    while(n % 2 === 0){

        factors.push(2);
        n /= 2;

    }

    for(let i = 3; i <= Math.sqrt(n); i += 2){

        while(n % i === 0){

            factors.push(i);
            n /= i;

        }

    }

    if(n > 2)
        factors.push(n);

    alert("Prime Factors = " + factors.join(" × "));

}
function alphaMenu(){

    let choice = prompt(
`ALPHA

1 = Store Value
2 = Recall Variable
3 = Show Variables

Enter choice:`);

    if(choice==1) alphaStore();
    else if(choice==2) alphaRecall();
    else if(choice==3) alphaShow();

}
function alphaStore(){

    try{

        let variable = prompt(
        "Store in variable:\nA,B,C,D,E,F,X,Y,M");

        if(variable===null) return;

        variable = variable.toUpperCase();

        if(!(variable in variables)){

            display.value="Invalid Variable";
            return;

        }

        let value = Number(prompt("Enter value"));

        if(isNaN(value)){

            display.value="Invalid Number";
            return;

        }

        variables[variable] = value;

        display.value = variable + " = " + value;

        lastAnswer = value;

    }

    catch{

        display.value="Error";

    }

}
function alphaRecall(){

    try{

        let variable = prompt(
        "Recall variable:\nA,B,C,D,E,F,X,Y,M");

        if(variable===null) return;

        variable = variable.toUpperCase();

        if(!(variable in variables)){

            display.value = "Invalid Variable";
            return;

        }

        display.value = variables[variable];

        lastAnswer = variables[variable];

    }

    catch{

        display.value = "Error";

    }

}
function alphaShow(){

    let text = "";

    for(let key in variables){

        text += key + " = " + variables[key] + "\n";

    }

    alert(text);

}
function baseMenu(){

    let choice = prompt(
`BASE MODE

1 = Dec → Bin
2 = Dec → Oct
3 = Dec → Hex
4 = Bin → Dec
5 = Oct → Dec
6 = Hex → Dec

Enter choice:`);

    if(choice==1) decToBin();
    else if(choice==2) decToOct();
    else if(choice==3) decToHex();
    else if(choice==4) binToDec();
    else if(choice==5) octToDec();
    else if(choice==6) hexToDec();

}
function decToBin(){

    try{

        let value = Number(prompt("Enter decimal number"));

        let result = value.toString(2);

        display.value = result;

        lastAnswer = result;

    }

    catch{

        display.value = "Error";

    }

}
function decToOct(){

    try{

        let value = Number(prompt("Enter decimal number"));

        let result = value.toString(8);

        display.value = result;

        lastAnswer = result;

    }

    catch{

        display.value = "Error";

    }

}
function decToHex(){

    try{

        let value = Number(prompt("Enter decimal number"));

        let result = value.toString(16).toUpperCase();

        display.value = result;

        lastAnswer = result;

    }

    catch{

        display.value = "Error";

    }

}
function binToDec(){

    try{

        let value = prompt("Enter binary number");

        if(value===null) return;

        let result = parseInt(value,2);

        if(isNaN(result)){

            display.value="Invalid Binary";
            return;

        }

        display.value = result;

        lastAnswer = result;

    }

    catch{

        display.value="Error";

    }

}
function octToDec(){

    try{

        let value = prompt("Enter octal number");

        if(value===null) return;

        let result = parseInt(value,8);

        if(isNaN(result)){

            display.value = "Invalid Octal";
            return;

        }

        display.value = result;

        lastAnswer = result;

    }

    catch{

        display.value = "Error";

    }

}
function hexToDec(){

    try{

        let value = prompt("Enter hexadecimal number");

        if(value===null) return;

        value = value.toUpperCase();

        let result = parseInt(value,16);

        if(isNaN(result)){

            display.value = "Invalid Hex";
            return;

        }

        display.value = result;

        lastAnswer = result;

    }

    catch{

        display.value = "Error";

    }

}
function statisticsMenu(){

    let choice = prompt(
`STATISTICS

1 = Mean
2 = Median
3 = Mode
4 = Standard Deviation
5 = Variance
6 = Sum (Σx)
7 = Sum of Squares (Σx²)
8 = Minimum
9 = Maximum
10 = Range
11 = Regression
12 = Quartiles
13 = IQR
14 = Percentile
15 = Z-Score
16 = Correlation
17 = Box Plot
18 = Covariance
19 = Skewness
20 = Kurtosis
21 = Coefficient of Variation
22 = Geometric Mean
23 = Harmonic Mean
24 = Weighted Mean

Enter choice:`);

    if(choice==1) statMean();
    else if(choice==2) statMedian();
    else if(choice==3) statMode();
    else if(choice==4) statStd();
    else if(choice==5) statVariance();
    else if(choice==6) statSum();
    else if(choice==7) statSumSquares();
    else if(choice==8) statMin();
    else if(choice==9) statMax();
    else if(choice==10) statRange();
    else if(choice==11) regressionMenu();
    else if(choice=="12")
        quartiles();
    else if(choice=="13"){
    interquartileRange();
}
    else if(choice=="14"){

    percentile();

}
    else if(choice=="15"){
    zScoreCalculator();

}
    else if(choice=="16"){
    correlationCoefficient();

}
    else if(choice=="17"){
    boxPlot();

}
    else if(choice=="18"){
    covariance();

}
    else if(choice=="19"){
    skewness();
}
    else if(choice=="20"){
    kurtosis();
}
    else if(choice=="21"){
    coefficientVariation();
}
    else if(choice=="22"){
    geometricMean();
}
    else if(choice=="23"){
    harmonicMean();
}
    else if(choice=="24"){
    weightedMean();
}
    

}
function weightedMean(){

    try{

        let values = prompt(
        "Enter values separated by commas");

        let weights = prompt(
        "Enter corresponding weights separated by commas");

        if(values===null || weights===null) return;

        let x = values.split(",").map(Number);
        let w = weights.split(",").map(Number);

        if(
            x.some(isNaN) ||
            w.some(isNaN) ||
            x.length!==w.length ||
            x.length===0
        ){

            display.value="Error";
            return;

        }

        let weightedSum = 0;
        let totalWeight = 0;

        for(let i=0;i<x.length;i++){

            weightedSum += x[i]*w[i];
            totalWeight += w[i];

        }

        if(totalWeight===0){

            display.value="Error";
            return;

        }

        let wm = weightedSum/totalWeight;

        display.value =
        "Weighted Mean = " +
        wm.toFixed(10);

        lastAnswer = wm;

    }

    catch{

        display.value="Error";

    }

}
function harmonicMean(){

    try{

        let input = prompt("Enter positive numbers separated by commas");

        if(input===null) return;

        let data = input.split(",").map(Number);

        if(data.some(isNaN) || data.some(x=>x<=0)){

            display.value = "Error";
            return;

        }

        let sum = 0;

        for(let i=0;i<data.length;i++){

            sum += 1/data[i];

        }

        let hm = data.length / sum;

        display.value =
        "Harmonic Mean = " + hm.toFixed(10);

        lastAnswer = hm;

    }

    catch{

        display.value = "Error";

    }

}
function geometricMean(){

    try{

        let input = prompt("Enter positive numbers separated by commas");

        if(input===null) return;

        let data = input.split(",").map(Number);

        if(data.some(isNaN) || data.some(x=>x<=0)){

            display.value = "Error";
            return;

        }

        let product = 1;

        for(let i=0;i<data.length;i++){

            product *= data[i];

        }

        let gm = Math.pow(product,1/data.length);

        display.value =
        "Geometric Mean = " + gm.toFixed(10);

        lastAnswer = gm;

    }

    catch{

        display.value = "Error";

    }

}
function coefficientVariation(){

    try{

        let input = prompt("Enter numbers separated by commas");

        if(input===null) return;

        let data = input.split(",").map(Number);

        if(data.some(isNaN) || data.length<2){

            display.value = "Error";
            return;

        }

        let n = data.length;

        let mean = data.reduce((a,b)=>a+b,0)/n;

        if(mean===0){

            display.value = "Undefined";
            return;

        }

        let variance = data.reduce((a,b)=>
            a+Math.pow(b-mean,2),0)/n;

        let sd = Math.sqrt(variance);

        let cv = (sd/mean)*100;

        display.value =
        "CV = " + cv.toFixed(10) + "%";

        lastAnswer = cv;

    }

    catch{

        display.value = "Error";

    }

}
function kurtosis(){

    try{

        let input = prompt("Enter numbers separated by commas");

        if(input===null) return;

        let data = input.split(",").map(Number);

        if(data.some(isNaN) || data.length<2){

            display.value = "Error";
            return;

        }

        let n = data.length;

        let mean = data.reduce((a,b)=>a+b,0)/n;

        let variance = data.reduce((a,b)=>a+Math.pow(b-mean,2),0)/n;

        let sd = Math.sqrt(variance);

        if(sd===0){

            display.value = "Kurtosis = 0";
            return;

        }

        let kurt = data.reduce((a,b)=>
            a+Math.pow((b-mean)/sd,4),0)/n - 3;

        display.value = "Kurtosis = " + kurt.toFixed(10);

        lastAnswer = kurt;

    }

    catch{

        display.value = "Error";

    }

}
function skewness(){

    try{

        let input = prompt("Enter numbers separated by commas");

        if(input===null) return;

        let data = input.split(",").map(Number);

        if(data.some(isNaN) || data.length<2){

            display.value="Error";
            return;

        }

        let n = data.length;

        let mean = data.reduce((a,b)=>a+b,0)/n;

        let variance = data.reduce((a,b)=>a+Math.pow(b-mean,2),0)/n;

        let sd = Math.sqrt(variance);

        if(sd===0){

            display.value="Skewness = 0";
            return;

        }

        let skew = data.reduce((a,b)=>
            a+Math.pow((b-mean)/sd,3),0)/n;

        display.value = "Skewness = " + skew.toFixed(10);

        lastAnswer = skew;

    }

    catch{

        display.value="Error";

    }

}
function boxPlot(){

    try{

        let input = prompt(
        "Enter numbers separated by commas\nExample: 2,5,7,8,10");

        if(input===null) return;

        let data = input.split(",").map(Number);

        if(data.some(isNaN)){

            display.value="Error";
            return;

        }

        data.sort((a,b)=>a-b);

        function median(arr){

            let n=arr.length;

            if(n%2===0)
                return (arr[n/2-1]+arr[n/2])/2;

            return arr[Math.floor(n/2)];

        }

        let n=data.length;

        let q2=median(data);

        let lower=data.slice(0,Math.floor(n/2));

        let upper=(n%2===0)?
        data.slice(n/2):
        data.slice(Math.floor(n/2)+1);

        let q1=median(lower);

        let q3=median(upper);

        let iqr=q3-q1;

        display.value=
        "Min="+data[0]+
        " Q1="+q1+
        " Med="+q2+
        " Q3="+q3+
        " Max="+data[n-1]+
        " IQR="+iqr;

        lastAnswer=display.value;

    }

    catch{

        display.value="Error";

    }

}
function zScoreCalculator(){

    let data = prompt("Enter data separated by commas:");

    if(!data){

        alert("No data");
        return;

    }

    let values = data.split(",").map(Number);

    if(values.some(isNaN)){

        alert("Invalid data");
        return;

    }


    let x = Number(prompt("Enter value (x):"));

    if(isNaN(x)){

        alert("Invalid value");
        return;

    }


    let sum = 0;

    for(let i = 0; i < values.length; i++){

        sum += values[i];

    }


    let mean = sum / values.length;


    let variance = 0;

    for(let i = 0; i < values.length; i++){

        variance += Math.pow(values[i] - mean, 2);

    }


    let sd = Math.sqrt(variance / values.length);


    if(sd === 0){

        alert("Standard deviation is zero");
        return;

    }


    let z = (x - mean) / sd;


    alert(
        "Mean = " + mean +
        "\nSD = " + sd +
        "\nZ-score = " + z
    );

}

function correlationCoefficient(){

    let xData = prompt("Enter X values separated by commas:");
    let yData = prompt("Enter Y values separated by commas:");

    if(!xData || !yData){

        alert("No data");
        return;

    }

    let x = xData.split(",").map(Number);
    let y = yData.split(",").map(Number);


    if(x.length !== y.length || x.some(isNaN) || y.some(isNaN)){

        alert("Invalid data");
        return;

    }


    let n = x.length;

    let sumX = 0;
    let sumY = 0;
    let sumXY = 0;
    let sumX2 = 0;
    let sumY2 = 0;


    for(let i = 0; i < n; i++){

        sumX += x[i];
        sumY += y[i];

        sumXY += x[i] * y[i];

        sumX2 += x[i] * x[i];

        sumY2 += y[i] * y[i];

    }


    let r =
    (n * sumXY - sumX * sumY) /
    Math.sqrt(
        (n * sumX2 - sumX * sumX) *
        (n * sumY2 - sumY * sumY)
    );


    alert("Correlation coefficient (r) = " + r);

}
function percentile(){

    let data = prompt("Enter values separated by commas:");

    if(!data){

        alert("No data");
        return;

    }

    let values = data.split(",").map(Number);

    if(values.some(isNaN)){

        alert("Invalid data");
        return;

    }

    let p = Number(prompt("Enter percentile (0-100):"));

    if(isNaN(p) || p < 0 || p > 100){

        alert("Invalid percentile");
        return;

    }

    values.sort((a,b)=>a-b);


    let index = (p / 100) * (values.length - 1);

    let lower = Math.floor(index);
    let upper = Math.ceil(index);


    let result;

    if(lower === upper){

        result = values[lower];

    }
    else{

        result =
        values[lower] +
        (index - lower) *
        (values[upper] - values[lower]);

    }


    alert(
        p + "th Percentile = " + result
    );

}
function interquartileRange(){

    let data = prompt("Enter values separated by commas:");

    if(!data){

        alert("No data");
        return;

    }

    let values = data.split(",").map(Number);

    if(values.some(isNaN)){

        alert("Invalid data");
        return;

    }

    values.sort((a,b)=>a-b);

    let n = values.length;

    let lower = values.slice(0, Math.floor(n/2));
    let upper = values.slice(Math.ceil(n/2));


    function median(arr){

        let m = arr.length;

        if(m % 2 === 0)

            return (arr[m/2-1] + arr[m/2]) / 2;

        else

            return arr[Math.floor(m/2)];

    }


    let q1 = median(lower);
    let q3 = median(upper);

    let iqr = q3 - q1;


    alert(
        "Q1 = " + q1 +
        "\nQ3 = " + q3 +
        "\nIQR = " + iqr
    );

}
function statMean(){

    try{

        let input = prompt(
        "Enter numbers separated by commas\nExample: 2,4,6,8");

        if(input===null) return;

        let data = input.split(",").map(Number);

        let mean = math.mean(data);

        display.value = mean;

        lastAnswer = mean;

    }

    catch{

        display.value = "Error";

    }

}
function statSum(){

    try{

        let input = prompt(
        "Enter numbers separated by commas\nExample: 2,4,6,8");

        if(input===null) return;

        let data = input.split(",").map(Number);

        let sum = math.sum(data);

        display.value = sum;

        lastAnswer = sum;

    }

    catch{

        display.value = "Error";

    }

}
function statMin(){

    try{

        let input = prompt(
        "Enter numbers separated by commas\nExample: 2,4,6,8");

        if(input===null) return;

        let data = input.split(",").map(Number);

        let min = math.min(data);

        display.value = min;

        lastAnswer = min;

    }

    catch{

        display.value = "Error";

    }

}
function regressionMenu(){

    let choice = prompt(
`REGRESSION

1 = Linear
2 = Quadratic
3 = Exponential
4 = Logarithmic
5 = Power

Enter choice:`);

    if(choice=="1")
        linearRegression();

    else if(choice=="2")
        quadraticRegression();

    else if(choice=="3")
        exponentialRegression();

    else if(choice=="4")
        logarithmicRegression();

    else if(choice=="5")
        powerRegression();

}
function inputRegressionData(){

    let n = parseInt(prompt("Number of data points"));

    if(isNaN(n) || n < 2){
        alert("Invalid number of data points.");
        return null;
    }

    let x = [];
    let y = [];

    for(let i = 0; i < n; i++){

        x.push(parseFloat(prompt("x" + (i + 1))));
        y.push(parseFloat(prompt("y" + (i + 1))));

    }

    return {x, y, n};

}
function linearRegression(){

    let data = inputRegressionData();

    if(!data) return;

    let {x, y, n} = data;

    let sx = 0;
    let sy = 0;
    let sxy = 0;
    let sx2 = 0;

    for(let i = 0; i < n; i++){

        sx += x[i];
        sy += y[i];
        sxy += x[i] * y[i];
        sx2 += x[i] * x[i];

    }

    let b = (n * sxy - sx * sy) / (n * sx2 - sx * sx);
    let a = (sy / n) - b * (sx / n);

    alert(
        "Linear Regression\n\n" +
        "Equation:\n" +
        "y = " + a + " + " + b + "x"
    );

}
function quadraticRegression(){

    let data = inputRegressionData();

    if(!data) return;

    let {x, y, n} = data;

    let sx = 0;
    let sx2 = 0;
    let sx3 = 0;
    let sx4 = 0;
    let sy = 0;
    let sxy = 0;
    let sx2y = 0;

    for(let i = 0; i < n; i++){

        let xi = x[i];
        let yi = y[i];

        sx += xi;
        sx2 += xi * xi;
        sx3 += xi * xi * xi;
        sx4 += xi * xi * xi * xi;

        sy += yi;
        sxy += xi * yi;
        sx2y += xi * xi * yi;

    }

    let A = [
        [n, sx, sx2],
        [sx, sx2, sx3],
        [sx2, sx3, sx4]
    ];

    let B = [
        sy,
        sxy,
        sx2y
    ];

    try{

        let result = math.lusolve(A, B);

        let a = result[0][0];
        let b = result[1][0];
        let c = result[2][0];

        alert(
            "Quadratic Regression\n\n" +
            "Equation:\n" +
            "y = " +
            a +
            " + " +
            b +
            "x + " +
            c +
            "x²"
        );

    }

    catch(error){

        alert("Unable to calculate quadratic regression.");

    }

}
function exponentialRegression(){

    let data = inputRegressionData();

    if(!data) return;

    let {x, y, n} = data;

    let sx = 0;
    let slny = 0;
    let sxlny = 0;
    let sx2 = 0;

    for(let i = 0; i < n; i++){

        if(y[i] <= 0){

            alert("All y values must be greater than 0.");
            return;

        }

        let lny = Math.log(y[i]);

        sx += x[i];
        slny += lny;
        sxlny += x[i] * lny;
        sx2 += x[i] * x[i];

    }

    let b =
        (n * sxlny - sx * slny) /
        (n * sx2 - sx * sx);

    let lnA = (slny / n) - b * (sx / n);

    let a = Math.exp(lnA);

    alert(
        "Exponential Regression\n\n" +
        "Equation:\n" +
        "y = " + a + "e^(" + b + "x)"
    );

}
function logarithmicRegression(){

    let data = inputRegressionData();

    if(!data) return;

    let {x, y, n} = data;

    let slnx = 0;
    let sy = 0;
    let slnx2 = 0;
    let slnxy = 0;

    for(let i = 0; i < n; i++){

        if(x[i] <= 0){

            alert("All x values must be greater than 0.");
            return;

        }

        let lnx = Math.log(x[i]);

        slnx += lnx;
        sy += y[i];
        slnx2 += lnx * lnx;
        slnxy += lnx * y[i];

    }

    let b =
        (n * slnxy - slnx * sy) /
        (n * slnx2 - slnx * slnx);

    let a = (sy / n) - b * (slnx / n);

    alert(
        "Logarithmic Regression\n\n" +
        "Equation:\n" +
        "y = " + a + " + " + b + "ln(x)"
    );

}
function powerRegression(){

    let data = inputRegressionData();

    if(!data) return;

    let {x, y, n} = data;

    let slnx = 0;
    let slny = 0;
    let slnxlny = 0;
    let slnx2 = 0;

    for(let i = 0; i < n; i++){

        if(x[i] <= 0 || y[i] <= 0){

            alert("All x and y values must be greater than 0.");
            return;

        }

        let lnx = Math.log(x[i]);
        let lny = Math.log(y[i]);

        slnx += lnx;
        slny += lny;
        slnxlny += lnx * lny;
        slnx2 += lnx * lnx;

    }

    let b =
        (n * slnxlny - slnx * slny) /
        (n * slnx2 - slnx * slnx);

    let lnA = (slny / n) - b * (slnx / n);

    let a = Math.exp(lnA);

    alert(
        "Power Regression\n\n" +
        "Equation:\n" +
        "y = " + a + "x^" + b
    );

}
function distributionMenu(){

    let choice = prompt(
`DISTRIBUTION

1 = Normal PDF
2 = Normal CDF
3 = Inverse Normal
4 = Binomial PDF
5 = Binomial CDF
6 = Poisson PDF
7 = Poisson CDF

Enter choice:`);

    if(choice=="1")
        normalPDF();

    else if(choice=="2")
        normalCDF();

    else if(choice=="3")
        inverseNormal();

    else if(choice=="4")
        binomialPDF();

    else if(choice=="5")
        binomialCDF();

    else if(choice=="6")
        poissonPDF();

    else if(choice=="7")
        poissonCDF();

}
function probabilityMenu(){

    let choice = prompt(

`PROBABILITY

1 = Conditional Probability
2 = Bayes' Theorem
3 = Expected Value`

    );

    switch(choice){

        case "1":
            conditionalProbability();
            break;

        case "2":
            bayesTheorem();
            break;

        case "3":
            expectedValue();
            break;

        default:
            display.value = "Cancelled";

    }

}
function normalPDF(){

    let x = parseFloat(prompt("x ="));
    let mean = parseFloat(prompt("Mean ="));
let sd = parseFloat(prompt("Standard deviation ="));

    if(sd <= 0){

        alert("Standard deviation must be positive.");
        return;

    }

    let pdf =
        (1/(sd*Math.sqrt(2*Math.PI)))*
        Math.exp(-0.5*Math.pow((x-mean)/sd,2));

    alert("Normal PDF = " + pdf);

}
function erf(x){

    let sign = (x >= 0) ? 1 : -1;
    x = Math.abs(x);

    let a1 = 0.254829592;
    let a2 = -0.284496736;
    let a3 = 1.421413741;
    let a4 = -1.453152027;
    let a5 = 1.061405429;
    let p = 0.3275911;

    let t = 1 / (1 + p * x);

    let y = 1 - (
        (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1)
        * t * Math.exp(-x * x)
    );

    return sign * y;

}
function normalCDF(){

    let x = parseFloat(prompt("x ="));
    let mean = parseFloat(prompt("Mean ="));
    let sd = parseFloat(prompt("Standard deviation ="));

    if(sd <= 0){

        alert("Standard deviation must be positive.");
        return;

    }

    let z = (x - mean) / (sd * Math.sqrt(2));

    let cdf = 0.5 * (1 + erf(z));

    alert("Normal CDF = " + cdf);

}
function inverseNormal(){

    let p = parseFloat(prompt("Probability (0-1) ="));
    let mean = parseFloat(prompt("Mean ="));
    let sd = parseFloat(prompt("Standard deviation ="));

    if(isNaN(p) || p <= 0 || p >= 1){

        alert("Probability must be between 0 and 1.");
        return;

    }

    if(sd <= 0){

        alert("Standard deviation must be positive.");
        return;

    }

    let low = mean - 10 * sd;
    let high = mean + 10 * sd;

    while(high - low > 1e-12){

        let mid = (low + high) / 2;

        let z = (mid - mean) / (sd * Math.sqrt(2));

        let cdf = 0.5 * (1 + erf(z));

        if(cdf < p)
            low = mid;
        else
            high = mid;

    }

    let x = (low + high) / 2;

    alert("Inverse Normal = " + x);

}
function combination(n, r){

    if(r < 0 || r > n)
        return 0;

    r = Math.min(r, n - r);

    let result = 1;

    for(let i = 1; i <= r; i++){

        result *= (n - r + i);
        result /= i;

    }

    return result;

}
function binomialPDF(){

    let n = parseInt(prompt("Number of trials (n) ="));
    let x = parseInt(prompt("Number of successes (x) ="));
    let p = parseFloat(prompt("Probability of success (p) ="));

    if(isNaN(n) || isNaN(x) || isNaN(p)){

        alert("Invalid input.");
        return;

    }

    if(n < 0 || x < 0 || x > n){

        alert("Invalid values.");
        return;

    }

    if(p < 0 || p > 1){

        alert("Probability must be between 0 and 1.");
        return;

    }

    let probability =
    combinationValue(n, x) *
    Math.pow(p, x) *
    Math.pow(1 - p, n - x);

    alert("Binomial PDF = " + probability);

}
function binomialCDF(){

    let n = parseInt(prompt("Number of trials (n) ="));
    let x = parseInt(prompt("Maximum successes (x) ="));
    let p = parseFloat(prompt("Probability of success (p) ="));

    if(isNaN(n) || isNaN(x) || isNaN(p)){

        alert("Invalid input.");
        return;

    }

    if(n < 0 || x < 0 || x > n){

        alert("Invalid values.");
        return;

    }

    if(p < 0 || p > 1){

        alert("Probability must be between 0 and 1.");
        return;

    }

    let probability = 0;

    for(let i = 0; i <= x; i++){

        probability +=
            combinationValue(n, i) *
            Math.pow(p, i) *
            Math.pow(1 - p, n - i);

    }

    alert("Binomial CDF = " + probability);

}
function statMax(){

    try{

        let input = prompt(
        "Enter numbers separated by commas\nExample: 2,4,6,8");

        if(input===null) return;

        let data = input.split(",").map(Number);

        let max = math.max(data);

        display.value = max;

        lastAnswer = max;

    }

    catch{

        display.value = "Error";

    }

}
function statRange(){

    try{

        let input = prompt(
        "Enter numbers separated by commas\nExample: 2,4,6,8");

        if(input===null) return;

        let data = input.split(",").map(Number);

        let range = math.max(data) - math.min(data);

        display.value = range;

        lastAnswer = range;

    }

    catch{

        display.value = "Error";

    }

}
function statSumSquares(){

    try{

        let input = prompt(
        "Enter numbers separated by commas\nExample: 2,4,6,8");

        if(input===null) return;

        let data = input.split(",").map(Number);

        let sumSquares = data.reduce((sum,n)=>sum+n*n,0);

        display.value = sumSquares;

        lastAnswer = sumSquares;

    }

    catch{

        display.value = "Error";

    }

}
function statMedian(){

    try{

        let input = prompt(
        "Enter numbers separated by commas\nExample: 2,4,6,8");

        if(input===null) return;

        let data = input.split(",").map(Number);

        let median = math.median(data);

        display.value = median;

        lastAnswer = median;

    }

    catch{

        display.value = "Error";

    }

}
function statMode(){

    try{

        let input = prompt(
        "Enter numbers separated by commas\nExample: 2,4,4,6,8");

        if(input===null) return;

        let data = input.split(",").map(Number);

        let mode = math.mode(data);

        display.value = mode;

        lastAnswer = mode;

    }

    catch{

        display.value = "Error";

    }

}
function statStd(){

    try{

        let input = prompt(
        "Enter numbers separated by commas\nExample: 2,4,6,8");

        if(input===null) return;

        let data = input.split(",").map(Number);

        let std = math.std(data);

        display.value = std;

        lastAnswer = std;

    }

    catch{

        display.value = "Error";

    }

}

function statVariance(){

    try{

        let input = prompt(
        "Enter numbers separated by commas\nExample: 2,4,6,8");

        if(input===null) return;

        let data = input.split(",").map(Number);

        let variance = math.variance(data);

        display.value = variance;

        lastAnswer = variance;

    }

    catch{

        display.value = "Error";

    }

}

function eng(){

    try{

        let value = Number(display.value);

        if(isNaN(value)){
            display.value = "Error";
            return;
        }

        display.value = math.format(value,{
            notation:"engineering",
            precision:10
        });
        engShift = 0;
        lastAnswer = value;

    }

    catch{

        display.value = "Error";

    }

}
function engUp(){

    try{

        let value = Number(lastAnswer);

        engShift += 3;

        display.value =
        (value/Math.pow(10,engShift))
        .toPrecision(10)
        + "e"
        + (engShift>=0?"+":"")
        + engShift;

    }

    catch{

        display.value="Error";

    }

}
function engDown(){

    try{

        let value = Number(lastAnswer);

        engShift -= 3;

        display.value =
        (value/Math.pow(10,engShift))
        .toPrecision(10)
        + "e"
        + (engShift>=0?"+":"")
        + engShift;

    }

    catch{

        display.value="Error";

    }

}
function matrixMenu(){

    let choice = prompt(
`MATRIX CALCULATOR

1 = Determinant
2 = Transpose
3 = Inverse
4 = Multiply
5 = Add
6 = Subtract
7 = Matrix Rank
8 = Matrix Trace
9 = LU Decomposition
10 = Eigenvalues
11 = Eigenvectors
12 = QR Decomposition


Enter choice:`);

    if(choice==1) matrixDet();
    else if(choice==2) matrixTranspose();
    else if(choice==3) matrixInverse();
    else if(choice==4) matrixMultiply();
    else if(choice==5) matrixAdd();
    else if(choice==6) matrixSubtract();
    else if(choice==7) matrixRank();
    else if(choice==8) matrixTrace();
    else if(choice==9) matrixLU();
    else if(choice==10) matrixEigenvalues();
    else if(choice==11) matrixEigenvectors();
    else if(choice==12) matrixQR();
    

}
function matrixRank(){

    try{

        let rows = Number(prompt("Number of rows ="));
        let cols = Number(prompt("Number of columns ="));

        if(isNaN(rows) || isNaN(cols) || rows <= 0 || cols <= 0){

            display.value = "Error";
            return;

        }

        let matrix = [];

        for(let i = 0; i < rows; i++){

            let row = prompt(
                "Enter row " + (i + 1) +
                "\nExample: 1,2,3"
            );

            if(row === null) return;

            row = row.split(",").map(Number);

            if(row.length !== cols || row.some(isNaN)){

                display.value = "Error";
                return;

            }

            matrix.push(row);

        }

        let rank = math.rank(matrix);

        display.value = "Rank = " + rank;

        lastAnswer = rank;

    }

    catch{

        display.value = "Matrix Error";

    }

}
function matrixTrace(){

    try{

        let size = Number(prompt("Matrix size ="));

        if(isNaN(size) || size <= 0){

            display.value = "Error";
            return;

        }

        let matrix = [];

        for(let i = 0; i < size; i++){

            let row = prompt(
                "Enter row " + (i + 1) +
                "\nExample: 1,2,3"
            );

            if(row === null) return;

            row = row.split(",").map(Number);

            if(row.length !== size || row.some(isNaN)){

                display.value = "Error";
                return;

            }

            matrix.push(row);

        }

        let trace = 0;

        for(let i = 0; i < size; i++){

            trace += matrix[i][i];

        }

        display.value = "Trace = " + trace;

        lastAnswer = trace;

    }

    catch{

        display.value = "Matrix Error";

    }

}
function matrixLU(){

    try{

        let size = Number(prompt("Matrix size ="));

        if(isNaN(size) || size <= 0){

            display.value = "Error";
            return;

        }

        let A = [];

        for(let i=0;i<size;i++){

            let row = prompt(
                "Enter row " + (i+1) +
                "\nExample: 1,2,3"
            );

            if(row===null) return;

            row = row.split(",").map(Number);

            if(row.length!==size || row.some(isNaN)){

                display.value="Error";
                return;

            }

            A.push(row);

        }

        let L = [];
        let U = [];

        for(let i=0;i<size;i++){

            L[i]=[];
            U[i]=[];

            for(let j=0;j<size;j++){

                L[i][j]=0;
                U[i][j]=0;

            }

        }

        for(let i=0;i<size;i++){

            for(let k=i;k<size;k++){

                let sum=0;

                for(let j=0;j<i;j++)
                    sum += L[i][j]*U[j][k];

                U[i][k]=A[i][k]-sum;

            }

            for(let k=i;k<size;k++){

                if(i==k){

                    L[i][i]=1;

                }else{

                    let sum=0;

                    for(let j=0;j<i;j++)
                        sum += L[k][j]*U[j][i];

                    if(U[i][i]===0){

                        display.value="Singular Matrix";
                        return;

                    }

                    L[k][i]=(A[k][i]-sum)/U[i][i];

                }

            }

        }

        display.value =
        "L=" + JSON.stringify(L) +
        "\nU=" + JSON.stringify(U);

        lastAnswer = {L,U};

    }

    catch{

        display.value="Matrix Error";

    }

}
function matrixEigenvalues(){

    try{

        let size = Number(prompt("Matrix size ="));

        if(isNaN(size) || size <= 0){

            display.value = "Error";
            return;

        }

        let matrix = [];

        for(let i = 0; i < size; i++){

            let row = prompt(
                "Enter row " + (i + 1) +
                "\nExample: 1,2,3"
            );

            if(row === null) return;

            row = row.split(",").map(Number);

            if(row.length !== size || row.some(isNaN)){

                display.value = "Error";
                return;

            }

            matrix.push(row);

        }

        let result = math.eigs(matrix);

        display.value =
        "Eigenvalues: " +
        result.values.map(v =>
            math.format(v,{precision:10})
        ).join(", ");

        lastAnswer = result.values;

    }

    catch(error){

        console.error(error);

        display.value = "Matrix Error";

    }

}
function matrixEigenvectors(){

    try{

        let size = Number(prompt("Matrix size ="));

        if(isNaN(size) || size <= 0){

            display.value = "Error";
            return;

        }

        let matrix = [];

        for(let i = 0; i < size; i++){

            let row = prompt(
                "Enter row " + (i + 1) +
                "\nExample: 1,2,3"
            );

            if(row === null) return;

            row = row.split(",").map(Number);

            if(row.length !== size || row.some(isNaN)){

                display.value = "Error";
                return;

            }

            matrix.push(row);

        }

        let result = math.eigs(matrix);

        let vectors = [];

        for(let i = 0; i < result.vectors.length; i++){

            vectors.push(
                "v" + (i + 1) + " = <" +
                result.vectors[i].vector
                .map(x => math.format(x,{precision:10}))
                .join(", ") +
                ">"
            );

        }

        display.value = vectors.join(" ; ");

        lastAnswer = vectors;

    }

    catch(error){

        console.error(error);

        display.value = "Matrix Error";

    }

}
function matrixQR(){

    try{

        let size = Number(prompt("Matrix size ="));

        if(isNaN(size) || size <= 0){

            display.value = "Error";
            return;

        }

        let matrix = [];

        for(let i=0;i<size;i++){

            let row = prompt(
                "Enter row " + (i+1) +
                "\nExample: 1,2,3"
            );

            if(row===null) return;

            row = row.split(",").map(Number);

            if(row.length!==size || row.some(isNaN)){

                display.value="Error";
                return;

            }

            matrix.push(row);

        }

        let result = math.qr(matrix);

        display.value =
        "Q=" + JSON.stringify(result.Q) +
        "\nR=" + JSON.stringify(result.R);

        lastAnswer = result;

    }

    catch(error){

        console.error(error);

        display.value = "Matrix Error";

    }

}
function insertComplex(){

    display.value += "i";

}
function openVectorMenu(){

    document.getElementById("vectorMenu").style.display="flex";

}

function closeVectorMenu(){

    document.getElementById("vectorMenu").style.display="none";

}

function vectorChoice(choice){

    closeVectorMenu();

    switch(choice){

        case 1:
            vectorAdd();
            break;

        case 2:
            vectorSubtract();
            break;

        case 3:
            vectorDot();
            break;

        case 4:
            vectorCross();
            break;

        case 5:
            vectorMagnitude();
            break;

        case 6:
            vectorUnit();
            break;

        case 7:
            vectorAngle();
            break;
        case 8:
         vectorProjection();
            break;
    }

}
function solverMenu(){

    let choice = prompt(
`SOLVER

1 = Linear Equation
2 = Quadratic Equation
3 = Cubic Equation
4 = Quartic Equation
5 = 2 Variable System
6 = 3 Variable System
7 = Numerical Solver (Newton)
8 = Distribution
9 = Inequality Solver

Enter choice:`);

    switch(choice){

        case "1":
            solveEquation();
            break;

        case "2":
            quadraticSolver();
            break;

        case "3":
            solveCubic();
            break;

        case "4":
            solveQuartic();
            break;

        case "5":
            solve2Variables();
            break;

        case "6":
            solve3Variables();
            break;
        case "7":
            numericalSolver();
            break;
        case "8":
            distributionMenu();
            break;
        case "9":
            inequalitySolver();
            break;
            
        default:
            display.value = "Cancelled";

    }

}
function numericalSolver(){

    try{

        let equation = prompt(
        "Enter equation in x\nExample:\nx^3-2*x-5=0"
        );

        if(equation===null) return;

        equation = equation.replace(/\s/g,"");

        if(!equation.includes("=")){

            display.value="Use =";
            return;

        }

        let parts = equation.split("=");

        let expression =
        "(" + parts[0] + ")-(" + parts[1] + ")";

        let x = Number(prompt("Initial Guess"));

        if(isNaN(x)){

            display.value="Error";
            return;

        }

        let h = 1e-7;

        for(let i=0;i<100;i++){

            let fx = math.evaluate(expression,{x:x});

            let dfx =
            (
                math.evaluate(expression,{x:x+h})
                -
                math.evaluate(expression,{x:x-h})
            )/(2*h);

            if(Math.abs(dfx)<1e-12){

                display.value="Derivative = 0";
                return;

            }

            let xNew = x - fx/dfx;

            if(Math.abs(xNew-x)<1e-12){

                display.value = Number(xNew.toFixed(12));

                lastAnswer = xNew;

                return;

            }

            x = xNew;

        }

        display.value="No Convergence";

    }

    catch{

        display.value="Error";

    }

}
function inequalitySolver(){

    try{

        let inequality = prompt(
            "Enter a linear inequality\nExample:\n2x+3>7"
        );

        if(inequality === null) return;

        inequality = inequality.replace(/\s/g,"");

        let match = inequality.match(/^([+-]?\d*)x([+-]\d+)?(<=|>=|<|>)([+-]?\d+)$/);

        if(!match){

            display.value = "Invalid";

            return;

        }

        let a = match[1];

        let b = match[2] || "0";

        let op = match[3];

        let c = Number(match[4]);

        if(a === "" || a === "+") a = 1;
        else if(a === "-") a = -1;
        else a = Number(a);

        b = Number(b);

        let x = (c - b)/a;

        if(a < 0){

            if(op == "<") op = ">";
            else if(op == ">") op = "<";
            else if(op == "<=") op = ">=";
            else if(op == ">=") op = "<=";

        }

        display.value = "x " + op + " " + math.format(x,{
            precision:10
        });

    }

    catch{

        display.value = "Error";

    }

}
function complexMenu(){

    let choice = prompt(
`COMPLEX MODE

1 = Add
2 = Subtract
3 = Multiply
4 = Divide
5 = Magnitude
6 = Conjugate
7 = Argument
8 = Real Part
9 = Imaginary Part
10 = Polar → Rectangular
11 = Rectangular → Polar
12 = Exponential Form
13 = n-th Roots
14 = Complex Power
15 = Complex Square Root

Enter choice:`);

    if(choice==1) complexAdd();
    else if(choice==2) complexSubtract();
    else if(choice==3) complexMultiply();
    else if(choice==4) complexDivide();
    else if(choice==5) complexAbs();
    else if(choice==6) complexConjugate();
    else if(choice==7) complexArg();
    else if(choice==8) complexReal();
    else if(choice==9) complexImag();
    else if(choice==10) polarToRect();
    else if(choice==11) rectToPolar();
    else if(choice==12) complexExponential();
else if(choice==13) complexNthRoots();
else if(choice==14) complexPower();
else if(choice==15) complexSqrt();

}
function rectToPolar(){

    try{

        let z = prompt("Enter complex number\nExample: 3+4i");

        let c = math.complex(z);

        let r = math.abs(c);

        let angle = math.arg(c) * 180 / Math.PI;

        display.value =
        "r = " + r.toFixed(10) +
        ", θ = " + angle.toFixed(10) + "°";

        lastAnswer = display.value;

    }

    catch{

        display.value = "Error";

    }

}
function complexExponential(){

    try{

        let z = prompt("Enter complex number\nExample: 3+4i");

        if(z===null) return;

        let c = math.complex(z);

        let r = math.abs(c);

        let theta = math.arg(c) * 180 / Math.PI;

        display.value =
        math.format(r,{precision:10}) +
        "e^(i" +
        math.format(theta,{precision:10}) +
        "°)";

        lastAnswer = display.value;

    }

    catch{

        display.value="Error";

    }

}
function complexNthRoots(){

    try{

        let z = prompt("Enter complex number\nExample: 1+i");

        if(z===null) return;

        let n = Number(prompt("Enter n ="));

        if(isNaN(n) || n<=0){

            display.value="Error";
            return;

        }

        let c = math.complex(z);

        let r = math.abs(c);

        let theta = math.arg(c);

        let rootR = Math.pow(r,1/n);

        let roots=[];

        for(let k=0;k<n;k++){

            let angle=(theta+2*Math.PI*k)/n;

            let real=rootR*Math.cos(angle);

            let imag=rootR*Math.sin(angle);

            roots.push(
                math.format(real,{precision:10})+
                (imag>=0?" + ":" - ")+
                math.format(Math.abs(imag),{precision:10})+
                "i"
            );

        }

        display.value=roots.join(" ; ");

        lastAnswer=display.value;

    }

    catch{

        display.value="Error";

    }

}
function complexPower(){

    try{

        let z = prompt("Enter complex number\nExample: 2+3i");

        if(z===null) return;

        let n = Number(prompt("Enter exponent ="));

        if(isNaN(n)){

            display.value="Error";
            return;

        }

        let c = math.complex(z);

        let result = math.pow(c,n);

        display.value =
        math.format(result.re,{precision:10})+
        (result.im>=0?" + ":" - ")+
        math.format(Math.abs(result.im),{precision:10})+
        "i";

        lastAnswer=result;

    }

    catch{

        display.value="Error";

    }

}
function complexSqrt(){

    try{

        let z = prompt("Enter complex number\nExample: 3+4i");

        if(z===null) return;

        let c = math.complex(z);

        let result = math.sqrt(c);

        display.value =
            math.format(result.re,{precision:10}) +
            (result.im>=0 ? " + " : " - ") +
            math.format(Math.abs(result.im),{precision:10}) +
            "i";

        lastAnswer = result;

    }

    catch{

        display.value = "Error";

    }

}
function complexImag(){

    try{

        let z = prompt("Enter complex number\nExample: 3+4i");

        let result = math.im(math.complex(z));

        display.value = result;

        lastAnswer = result;

    }

    catch{

        display.value = "Error";

    }

}
function complexAdd(){

    try{

        let a = prompt("First complex number\nExample: 3+4i");

        let b = prompt("Second complex number\nExample: 2-5i");

        let result = math.add(math.complex(a), math.complex(b));

        display.value = result.toString();

        lastAnswer = result.toString();

    }

    catch{

        display.value = "Error";

    }

}
function complexSubtract(){

    try{

        let a = prompt("First complex number\nExample: 3+4i");

        let b = prompt("Second complex number\nExample: 2-5i");

        let result = math.subtract(math.complex(a), math.complex(b));

        display.value = result.toString();

        lastAnswer = result.toString();

    }

    catch{

        display.value = "Error";

    }

}
function complexMultiply(){

    try{

        let a = prompt("First complex number\nExample: 3+4i");

        let b = prompt("Second complex number\nExample: 2-5i");

        let result = math.multiply(math.complex(a), math.complex(b));

        display.value = result.toString();

        lastAnswer = result.toString();

    }

    catch{

        display.value = "Error";

    }

}
function complexDivide(){

    try{

        let a = prompt("First complex number\nExample: 3+4i");

        let b = prompt("Second complex number\nExample: 2-5i");

        let result = math.divide(math.complex(a), math.complex(b));

        display.value = result.toString();

        lastAnswer = result.toString();

    }

    catch{

        display.value = "Error";

    }

}
function complexAbs(){

    try{

        let z = prompt("Enter complex number\nExample: 3+4i");

        let result = math.abs(math.complex(z));

        display.value = result;

        lastAnswer = result;

    }

    catch{

        display.value = "Error";

    }

}
function complexConjugate(){

    try{

        let z = prompt("Enter complex number\nExample: 3+4i");

        let result = math.conj(math.complex(z));

        display.value = result.toString();

        lastAnswer = result.toString();

    }

    catch{

        display.value = "Error";

    }

}
function complexArg(){

    try{

        let z = prompt("Enter complex number\nExample: 3+4i");

        let result = math.arg(math.complex(z));

        display.value = math.unit(result,"rad").toNumber("deg") + "°";

        lastAnswer = display.value;

    }

    catch{

        display.value = "Error";

    }

}
function complexReal(){

    try{

        let z = prompt("Enter complex number\nExample: 3+4i");

        let result = math.re(math.complex(z));

        display.value = result;

        lastAnswer = result;

    }

    catch{

        display.value = "Error";

    }

}
function polarToRect(){

    try{

        let r = Number(prompt("Enter magnitude (r)"));

        let angle = Number(prompt("Enter angle (degrees)"));

        let rad = angle * Math.PI / 180;

        let real = r * Math.cos(rad);

        let imag = r * Math.sin(rad);

        let result = math.complex(real, imag);

        display.value = result.toString();

        lastAnswer = result.toString();

    }

    catch{

        display.value = "Error";

    }

}
function quadraticSolver(){

    try{

        let a = Number(prompt("Enter a"));

        let b = Number(prompt("Enter b"));

        let c = Number(prompt("Enter c"));

        let d = b*b - 4*a*c;

        if(d >= 0){

            let x1 = (-b + Math.sqrt(d))/(2*a);

            let x2 = (-b - Math.sqrt(d))/(2*a);

            display.value =
            "x₁=" + x1 +
            ", x₂=" + x2;

        }

        else{

            let real = -b/(2*a);

            let imag = Math.sqrt(-d)/(2*a);

            display.value =
            "x₁=" + real + "+" + imag + "i, " +
            "x₂=" + real + "-" + imag + "i";

        }

        lastAnswer = display.value;

    }

    catch{

        display.value = "Error";

    }

}
function solveQuartic(){

    try{

        let input = prompt(
            "Enter coefficients a,b,c,d,e for ax⁴+bx³+cx²+dx+e=0"
        );

        if(input === null) return;

        let parts = input.split(",");

        if(parts.length !== 5){

            display.value = "Use a,b,c,d,e";
            return;

        }

        let a = Number(parts[0]);
        let b = Number(parts[1]);
        let c = Number(parts[2]);
        let d = Number(parts[3]);
        let e = Number(parts[4]);

        if(a === 0){

            display.value = "a ≠ 0";
            return;

        }

        let f = x =>
            a*x*x*x*x + b*x*x*x + c*x*x + d*x + e;

        let roots = [];

        for(let guess=-100; guess<=100; guess++){

            let x = guess;

            for(let i=0; i<50; i++){

                let fx = f(x);

                let dfx =
                    4*a*x*x*x +
                    3*b*x*x +
                    2*c*x +
                    d;

                if(Math.abs(dfx)<1e-12) break;

                x = x - fx/dfx;

            }

            if(Math.abs(f(x))<1e-6){

                let duplicate =
                roots.some(r=>Math.abs(r-x)<1e-5);

                if(!duplicate){

                    roots.push(Number(x.toFixed(10)));

                }

            }

        }

        if(roots.length===0)

            display.value="No Real Root";

        else

            display.value=roots.join(" , ");

    }

    catch{

        display.value="Error";

    }

}
function cubicSolver(){

    try{

        let a = Number(prompt("Enter a"));
        let b = Number(prompt("Enter b"));
        let c = Number(prompt("Enter c"));
        let d = Number(prompt("Enter d"));

        let coeffs = [a,b,c,d];

        let roots = math.polynomialRoot(...coeffs);

        display.value = roots.join(", ");

        lastAnswer = display.value;

    }

    catch{

        display.value = "Error";

    }

}
function bisectionMethod(){

    try{

        let input = prompt(
            "Enter equation,left,right\nExample:\nx^3-2*x-5,2,3"
        );

        if(input===null) return;

        let parts = input.split(",");

        if(parts.length!==3){

            display.value="Use equation,left,right";
            return;

        }

        let expr=parts[0];

        let a=Number(parts[1]);

        let b=Number(parts[2]);

        let fa=math.evaluate(expr,{x:a});

        let fb=math.evaluate(expr,{x:b});

        if(fa*fb>0){

            display.value="Invalid Interval";

            return;

        }

        for(let i=0;i<100;i++){

            let c=(a+b)/2;

            let fc=math.evaluate(expr,{x:c});

            if(Math.abs(fc)<1e-12){

                a=c;

                break;

            }

            if(fa*fc<0){

                b=c;

                fb=fc;

            }

            else{

                a=c;

                fa=fc;

            }

        }

        display.value="x = "+a;

    }

    catch(error){

        console.error(error);

        display.value="Error";

    }

}
function vectorSubtract(){

    try{

        let v1 = prompt("Enter first vector\nExample: 5,6,7");
        let v2 = prompt("Enter second vector\nExample: 2,3,4");

        v1 = v1.split(",").map(Number);
        v2 = v2.split(",").map(Number);

        let result=[];

        for(let i=0;i<v1.length;i++){

            result.push(v1[i]-v2[i]);

        }

        display.value="<"+result.join(", ")+">";

    }

    catch(error){

        display.value="Error";

    }

}
function vectorDot(){

    try{

        let v1 = prompt("First vector\nExample: 1,2,3");
        let v2 = prompt("Second vector\nExample: 4,5,6");

        v1=v1.split(",").map(Number);
        v2=v2.split(",").map(Number);

        let result=0;

        for(let i=0;i<v1.length;i++){

            result += v1[i]*v2[i];

        }

        display.value=result;

    }

    catch(error){

        display.value="Error";

    }

}
function vectorCross(){

    try{

        let v1 = prompt("Enter first 3D vector\nExample: 1,2,3");

        if(v1===null) return;

        let v2 = prompt("Enter second 3D vector\nExample: 4,5,6");

        if(v2===null) return;

        v1 = v1.split(",").map(Number);
        v2 = v2.split(",").map(Number);

        if(v1.length!==3 || v2.length!==3){

            display.value="Use 3D vectors";
            return;

        }

        let x = v1[1]*v2[2]-v1[2]*v2[1];
        let y = v1[2]*v2[0]-v1[0]*v2[2];
        let z = v1[0]*v2[1]-v1[1]*v2[0];

        display.value = "<" + x + ", " + y + ", " + z + ">";

    }

    catch(error){

        console.error(error);

        display.value="Error";

    }

}
function vectorAngle(){

    try{

        let v1 = prompt("Enter first vector\nExample: 1,2,3");

        if(v1===null) return;

        let v2 = prompt("Enter second vector\nExample: 4,5,6");

        if(v2===null) return;

        v1 = v1.split(",").map(Number);

        v2 = v2.split(",").map(Number);

        if(v1.length!==v2.length){

            display.value = "Different dimensions";
            return;

        }

        let dot = 0;
        let mag1 = 0;
        let mag2 = 0;

        for(let i=0;i<v1.length;i++){

            dot += v1[i]*v2[i];

            mag1 += v1[i]*v1[i];

            mag2 += v2[i]*v2[i];

        }

        mag1 = Math.sqrt(mag1);
        mag2 = Math.sqrt(mag2);

        let angle = Math.acos(dot/(mag1*mag2));

        if(degreeMode){

            angle = angle * 180 / Math.PI;

        }

        display.value = angle;

    }

    catch(error){

        console.error(error);

        display.value = "Error";

    }

}
function vectorMagnitude(){

    try{

        let v = prompt("Enter vector\nExample: 3,4");

        v=v.split(",").map(Number);

        let sum=0;

        for(let i=0;i<v.length;i++){

            sum += v[i]*v[i];

        }

        display.value=Math.sqrt(sum);

    }

    catch(error){

        display.value="Error";

    }

}
function vectorUnit(){

    try{

        let v = prompt("Enter vector\nExample: 3,4");

        v=v.split(",").map(Number);

        let sum=0;

        for(let i=0;i<v.length;i++){

            sum += v[i]*v[i];

        }

        let mag=Math.sqrt(sum);

        let result=[];

        for(let i=0;i<v.length;i++){

            result.push(v[i]/mag);

        }

        let finalResult = "<" + result.join(", ") + ">";

setPreview(finalResult);

display.value = finalResult;

}

catch(error){

    setPreview("Error");

    display.value = "Error";

}

}
function vectorMenu(){

    let choice = prompt(

`VECTOR CALCULATOR

1 = Vector Addition
2 = Vector Subtraction
3 = Dot Product
4 = Cross Product
5 = Magnitude
6 = Unit Vector
7 = Angle Between Vectors
8 = VectorProjection`

    );

    switch(choice){

        case "1":
            vectorAdd();
            break;

        case "2":
            vectorSubtract();
            break;

        case "3":
            vectorDot();
            break;

        case "4":
            vectorCross();
            break;

        case "5":
            vectorMagnitude();
            break;

        case "6":
            vectorUnit();
            break;

        default:
            display.value = "Cancelled";
        case "7":
        vectorAngle();
        break;
        case "8":
    vectorProjection();
    break;

    }

}
function vectorProjection(){

    try{

        let v1 = prompt("Enter vector A\nExample: 3,4,0");

        if(v1===null) return;

        let v2 = prompt("Enter vector B\nExample: 1,2,0");

        if(v2===null) return;

        v1 = v1.split(",").map(Number);

        v2 = v2.split(",").map(Number);

        if(v1.length!==v2.length){

            display.value="Different dimensions";

            return;

        }

        let dot=0;

        let mag2=0;

        for(let i=0;i<v1.length;i++){

            dot += v1[i]*v2[i];

            mag2 += v2[i]*v2[i];

        }

        if(mag2===0){

            display.value="Zero Vector";

            return;

        }

        let k = dot/mag2;

        let result=[];

        for(let i=0;i<v2.length;i++){

            result.push(k*v2[i]);

        }

        display.value="<"+result.join(", ")+">";

    }

    catch(error){

        console.error(error);

        display.value="Error";

    }

}
function taylorSeries(){

    try{

        let input = prompt(
            "Enter function, point, terms\nExample:\nsin(x),0,8"
        );

        if(input===null) return;

        let parts = input.split(",");

        if(parts.length!==3){

            display.value="Use f(x),point,terms";
            return;

        }

        let expr = parts[0];

        let point = Number(parts[1]);

        let terms = Number(parts[2]);

        if(isNaN(point) || isNaN(terms)){

            display.value="Error";
            return;

        }

        let poly = math.parse("0");

        for(let n=0;n<terms;n++){

            let derivative = math.derivative(expr,"x");

            let value = math.evaluate(expr,{x:point});

            let term = math.parse(
                "(" + value + ")*(x-" + point + ")^" + n +
                "/" + math.factorial(n)
            );

            poly = math.simplify(poly.toString() + "+" + term.toString());

            expr = derivative.toString();

        }

        display.value = poly.toString();

    }

    catch(error){

        console.error(error);

        display.value="Error";

    }

}
function newtonSolver(){

    try{

        let input = prompt(
            "Enter equation and initial guess\nExample:\nx^3-2*x-5,2"
        );

        if(input===null) return;

        let parts = input.split(",");

        if(parts.length!==2){

            display.value="Use equation,guess";
            return;

        }

        let expr = parts[0];

        let x = Number(parts[1]);

        if(isNaN(x)){

            display.value="Invalid guess";
            return;

        }

        let derivative = math.derivative(expr,"x").toString();

        for(let i=0;i<30;i++){

            let fx = math.evaluate(expr,{x:x});

            let dfx = math.evaluate(derivative,{x:x});

            if(Math.abs(dfx)<1e-12){

                display.value="Derivative = 0";
                return;

            }

            let next = x - fx/dfx;

            if(Math.abs(next-x)<1e-12){

                x = next;
                break;

            }

            x = next;

        }

        display.value = "x = " + math.format(x,{
            precision:precision
        });

        lastAnswer = x;

    }

    catch(error){

        console.error(error);

        display.value="Error";

    }

}
function runProgram(){

    try{

        let code = prompt(
`Write JavaScript calculation code.

Example:
return 2+3;

Example:
let r=5;
return Math.PI*r*r;`
        );

        if(code===null) return;

        let result = Function(code)();

        display.value = result;

        lastAnswer = result;

    }

    catch(error){

        console.error(error);

        display.value="Program Error";

    }

}
function calculateLimit(){

    try{

        let input = display.value;

if(input.trim() === ""){

    display.value = "Use f(x),point";

    return;

}

        if(input===null) return;

        let parts = input.split(",");

        if(parts.length!==2){

            display.value="Use f(x),point";
            return;

        }

        let expr = parts[0];

        let point = Number(parts[1]);

        let h = 0.000000001;

        let left = math.evaluate(expr,{x:point-h});

        let right = math.evaluate(expr,{x:point+h});

        let limit = (left+right)/2;

        display.value = math.format(limit,{
            precision:precision
        });

        lastAnswer = limit;

    }

    catch(error){

        console.error(error);

        display.value="Error";

    }

}
function factorExpression(){

    try{

        let result = math.simplify(display.value);

        display.value = result.toString();

        lastAnswer = display.value;

    }

    catch(error){

        display.value = "Error";

        console.error(error);

    }

}
function verifyEquation(){

    try{

        let equation = display.value.replace(/\s/g,"");

        if(!equation.includes("=")){

            display.value = "Use equation";
            return;

        }

        let xValue = prompt("Enter value of x:");

        if(xValue === null) return;

        xValue = Number(xValue);

        if(isNaN(xValue)){

            display.value = "Invalid x";
            return;

        }

        let parts = equation.split("=");

        let left = math.evaluate(parts[0], {x:xValue});

        let right = math.evaluate(parts[1], {x:xValue});

        if(Math.abs(left - right) < 1e-10){

            display.value = "TRUE";

        }else{

            display.value = "FALSE";
        }

    }

    catch(error){

        console.error(error);

        display.value = "Error";

    }

}
function solveCubic(){

    try{

        let input = prompt(
            "Enter coefficients a,b,c,d for ax³+bx²+cx+d=0"
        );

        if(input === null) return;

        let parts = input.split(",");

        if(parts.length !== 4){

            display.value = "Use a,b,c,d";
            return;

        }

        let a = Number(parts[0]);
        let b = Number(parts[1]);
        let c = Number(parts[2]);
        let d = Number(parts[3]);

        if(a === 0){

            display.value = "a ≠ 0";
            return;

        }

        let f = function(x){
            return a*x*x*x + b*x*x + c*x + d;
        };

        let roots = [];

        for(let guess = -100; guess <= 100; guess++){

            let x = guess;

            for(let i = 0; i < 40; i++){

                let fx = f(x);

                let dfx = 3*a*x*x + 2*b*x + c;

                if(Math.abs(dfx) < 1e-12) break;

                x = x - fx/dfx;

            }

            if(Math.abs(f(x)) < 1e-6){

                let duplicate = roots.some(r => Math.abs(r-x) < 1e-5);

                if(!duplicate){

                    roots.push(Number(x.toFixed(10)));

                }

            }

        }

        if(roots.length === 0){

            display.value = "No Real Root";

        }else{

            display.value = roots.join(" , ");

        }

    }

    catch(error){

        console.error(error);

        display.value = "Error";

    }

}
function solve2Variables(){

    try{

        let input = display.value.replace(/\s/g,"");

        let equations = input.split(";");

        if(equations.length !== 2){

            display.value = "Use eq1;eq2";
            return;

        }

        let eq1 = equations[0].split("=");
        let eq2 = equations[1].split("=");

        if(eq1.length !== 2 || eq2.length !== 2){

            display.value = "Invalid";
            return;

        }

        let expr1 = "(" + eq1[0] + ")-(" + eq1[1] + ")";
        let expr2 = "(" + eq2[0] + ")-(" + eq2[1] + ")";

        let c1 = Number(math.evaluate(expr1,{x:0,y:0}));
        let ax1 = Number(math.evaluate(expr1,{x:1,y:0})) - c1;
        let ay1 = Number(math.evaluate(expr1,{x:0,y:1})) - c1;

        let c2 = Number(math.evaluate(expr2,{x:0,y:0}));
        let ax2 = Number(math.evaluate(expr2,{x:1,y:0})) - c2;
        let ay2 = Number(math.evaluate(expr2,{x:0,y:1})) - c2;

        let det = ax1*ay2 - ax2*ay1;

        if(Math.abs(det) < 1e-12){

            display.value = "No Unique Solution";
            return;

        }

        let x = (-c1*ay2 + c2*ay1)/det;
        let y = (-ax1*c2 + ax2*c1)/det;

        let result = "x=" + x + " , y=" + y;

finishCalculation(eq1 + ";" + eq2, result);

    }

    catch(error){

        console.error(error);

        display.value = "Error";

    }

}
function solve3Variables(){

    try{

        let input = display.value.replace(/\s/g,"");

        let equations = input.split(";");

        if(equations.length !== 3){

            display.value = "Use eq1;eq2;eq3";
            return;

        }

        let A = [];
        let B = [];

        for(let i=0;i<3;i++){

            let parts = equations[i].split("=");

            if(parts.length!==2){

                display.value="Invalid";
                return;

            }

            let expr="("+parts[0]+")-("+parts[1]+")";

            let c=Number(math.evaluate(expr,{x:0,y:0,z:0}));

            let ax=Number(math.evaluate(expr,{x:1,y:0,z:0}))-c;

            let ay=Number(math.evaluate(expr,{x:0,y:1,z:0}))-c;

            let az=Number(math.evaluate(expr,{x:0,y:0,z:1}))-c;

            A.push([ax,ay,az]);

            B.push(-c);

        }

        let result = math.lusolve(A,B);

        let output =
    "x=" + result[0][0] +
    ", y=" + result[1][0] +
    ", z=" + result[2][0];

finishCalculation(equations.join(";"), output);

    }

    catch(error){

        console.error(error);

        display.value="Error";

    }

}
function setPrecision(){

    let value = prompt("Enter decimal places (0-15):", precision);

    value = Number(value);

    if(!isNaN(value) && value >= 0 && value <= 15){

        precision = value;

    }

}
function exportHistory(){

    if(history.length === 0){

        alert("No history available");

        return;

    }


    let text = "Calculator History\n\n";


    history.forEach(item=>{

        text += item.expression + " = " + item.answer + "\n";

    });


    let file = new Blob(
        [text],
        {type:"text/plain"}
    );


    let link = document.createElement("a");

    link.href = URL.createObjectURL(file);

    link.download = "calculator_history.txt";

    link.click();

}
let graphScale = 25;
function toggleTheme(){

    document.body.classList.toggle("light-mode");

}


function toggleSettings() {
    const panel = document.getElementById("settingsPanel");

    if (!panel) {
        console.error("Settings panel not found");
        return;
    }

    panel.classList.toggle("settings-open");
}


function saveGraph(){

    const canvas = document.getElementById("graphCanvas");

    const link = document.createElement("a");

    link.download = "graph.png";

    link.href = canvas.toDataURL("image/png");

    link.click();

}
let offsetX = 0;
let offsetY = 0;

let dragging = false;

let lastMouseX = 0;
let lastMouseY = 0;
function constants(){

    let choice = prompt(

`Choose Constant

1 = π
2 = e
3 = Speed of Light
4 = Gravitational Constant
5 = Planck Constant
6 = Avogadro Number
7 = Electron Charge
8 = Gas Constant`

    );

    switch(choice){

        case "1":
            display.value = Math.PI;
            break;

        case "2":
            display.value = Math.E;
            break;

        case "3":
            display.value = "299792458";
            break;

        case "4":
            display.value = "6.67430e-11";
            break;

        case "5":
            display.value = "6.62607015e-34";
            break;

        case "6":
            display.value = "6.02214076e23";
            break;

        case "7":
            display.value = "1.602176634e-19";
            break;

        case "8":
            display.value = "8.314462618";
            break;

        default:
            display.value = "Invalid";

    }

}
function showFormulas(){

    let choice = prompt(

`Choose a category:

1 = Circle
2 = Triangle
3 = Quadratic
4 = Physics
5 = Trigonometry`

    );

    switch(choice){

        case "1":

            display.value =
            "Area=πr²  Circumference=2πr";

            break;

        case "2":

            display.value =
            "Area=(1/2)bh";

            break;

        case "3":

            display.value =
            "x=(-b±√(b²-4ac))/2a";

            break;

        case "4":

            display.value =
            "F=ma  E=mc²";

            break;

        case "5":

            display.value =
            "sin²x+cos²x=1";

            break;

        default:

            display.value = "Invalid";

    }

}
function symbolicDerivative(){

    try{

        let result = math.derivative(display.value, "x");

        display.value = result.toString();

        lastAnswer = display.value;

    }

    catch(error){

        display.value = "Error";

        console.error(error);

    }

}
function simplifyExpression(){

    try{

        let result = math.simplify(display.value);

        display.value = result.toString();

        lastAnswer = display.value;

    }

    catch{

        display.value = "Error";

    }

}
function drawMultipleGraphs(){

    try{

        const canvas = document.getElementById("graphCanvas");

        const ctx = canvas.getContext("2d");

        ctx.clearRect(0,0,canvas.width,canvas.height);
        // Draw Grid
        for(let x = 0; x <= canvas.width; x += graphScale){

    let value = (x - canvas.width/2) / graphScale;

    ctx.fillText(
        value,
        x + 2,
        canvas.height/2 + 15
    );

}
for(let y = 0; y <= canvas.height; y += graphScale){

    let value = (canvas.height/2 - y) / graphScale;

    if(value !== 0){

        ctx.fillText(
            value,
            canvas.width/2 + 5,
            y - 2
        );

    }

}

ctx.strokeStyle = "#dddddd";

for(let x = 0; x <= canvas.width; x += graphScale){

    ctx.beginPath();

    ctx.moveTo(x,0);

    ctx.lineTo(x,canvas.height);

    ctx.stroke();

}

for(let y = 0; y <= canvas.height; y += graphScale){

    ctx.beginPath();

    ctx.moveTo(0,y);

    ctx.lineTo(canvas.width,y);

    ctx.stroke();

}

        // Draw axes
        ctx.beginPath();

        ctx.moveTo(canvas.width/2,0);
        ctx.lineTo(canvas.width/2,canvas.height);

        ctx.moveTo(0,canvas.height/2);
        ctx.lineTo(canvas.width,canvas.height/2);

        ctx.stroke();

        let expressions = display.value.split(",");

        let colors = [
            "red",
            "blue",
            "green",
            "purple",
            "orange",
            "brown"
        ];

        expressions.forEach(function(expression,index){

            ctx.strokeStyle = colors[index % colors.length];

            ctx.beginPath();

            for(let px=0; px<canvas.width; px++){

                let x = (px - canvas.width/2 - offsetX) / graphScale;

                let y = math.evaluate(expression,{x:x});

                let py = canvas.height/2 - y * graphScale + offsetY;

                if(px===0)

                    ctx.moveTo(px,py);

                else

                    ctx.lineTo(px,py);

            }

            ctx.stroke();

        });

    }

    catch{

        display.value = "Graph Error";

    }

}
function integrate(){

    try{

        let input = display.value.split(",");

        if(input.length !== 3){

            display.value = "Use f(x),a,b";
            return;

        }

        let expression = input[0];

        let a = Number(input[1]);

        let b = Number(input[2]);

        if(isNaN(a) || isNaN(b)){

            display.value = "Error";
            return;

        }

        let n = 1000;

        let h = (b - a) / n;

        let sum = 0;

        for(let i = 0; i <= n; i++){

            let x = a + i * h;

            let fx = math.evaluate(expression,{x:x});

            if(i === 0 || i === n)

                sum += fx;

            else

                sum += 2 * fx;

        }

        let result = (h / 2) * sum;
        result = Number(result.toFixed(10));

finishCalculation(input.join(","), result);
    }

    catch{

        display.value = "Error";

    }
    
}
function differentiate(){

    try{

        let input = display.value.split(",");

        if(input.length !== 2){

            display.value = "Use f(x),x";
            return;

        }

        let expression = input[0];

        let x = Number(input[1]);

        if(isNaN(x)){

            display.value = "Error";
            return;

        }

        let h = 0.00001;

        let f1 = math.evaluate(expression,{x:x+h});

        let f2 = math.evaluate(expression,{x:x-h});
        
        let result = (f1-f2)/(2*h);

        result = Math.round(result * 1e10) / 1e10;

if(Math.abs(result - Math.round(result)) < 1e-10){

    result = Math.round(result);

}

finishCalculation(input.join(","), result);
    }

    catch{

        display.value = "Error";

    }

}

function meterToFeet(){

    let value = Number(display.value);

    if(isNaN(value)){
        display.value = "Error";
        return;
    }

    display.value = value * 3.28084;

}

function feetToMeter(){

    let value = Number(display.value);

    if(isNaN(value)){
        display.value = "Error";
        return;
    }

    display.value = value / 3.28084;

}

function celsiusToFahrenheit(){

    let value = Number(display.value);

    if(isNaN(value)){
        display.value = "Error";
        return;
    }

    display.value = (value * 9 / 5) + 32;

}

function fahrenheitToCelsius(){

    let value = Number(display.value);

    if(isNaN(value)){
        display.value = "Error";
        return;
    }

    display.value = (value - 32) * 5 / 9;

}

function kgToPound(){

    let value = Number(display.value);

    if(isNaN(value)){
        display.value = "Error";
        return;
    }

    display.value = value * 2.20462;

}

function poundToKg(){

    let value = Number(display.value);

    if(isNaN(value)){
        display.value = "Error";
        return;
    }

    display.value = value / 2.20462;

}
function zoomIn(){

    graphScale += 5;

    drawGraph();

}

function zoomOut(){

    if(graphScale > 5){

        graphScale -= 5;

        drawGraph();

    }

}
function drawGraph(){

    try{

        const canvas =
        document.getElementById("graphCanvas");

        const ctx = canvas.getContext("2d");

        ctx.clearRect(0,0,500,400);

        // Axes
        ctx.beginPath();

        ctx.moveTo(250,0);
        ctx.lineTo(250,400);

        ctx.moveTo(0,200);
        ctx.lineTo(500,200);

        ctx.stroke();

        // Function
        let expression = display.value;

        ctx.beginPath();

        for(let px=0; px<=500; px++){

            let x = (px - 250) / graphScale;

            let y = math.evaluate(expression,{x:x});

            let py = 200 - y * graphScale;

            if(px===0)
                ctx.moveTo(px,py);
            else
                ctx.lineTo(px,py);

        }

        ctx.stroke();

    }

    catch{

        display.value="Graph Error";

    }

}
function graphAnalysisMenu(){

    let choice = prompt(

`GRAPH ANALYSIS

1 = Find Root
2 = Find Y-Intercept
3 = Find Value f(x)
4 = Maximum
5 = Minimum
6 = Intersection
7 = Trace
8 = Tangent Line
9 = Normal Line
10 = Area Under Curve
11 = Arc Length
12 = Automatic Root Search
13 = Auto Maximum
14 = Auto Minimum`

    );

    switch(choice){

        case "1":
            graphRoot();
            break;

        case "2":
            graphYIntercept();
            break;

        case "3":
            graphValue();
            break;

        case "4":
            graphMaximum();
            break;

        case "5":
            graphMinimum();
            break;

        case "6":
        graphIntersection();
            break;
        case "7":
            graphTrace();
            break;
        case "8":
            graphTangent();
            break;
        case "9":
            graphNormal();
            break;
        case "10":
            graphArea();
            break;
        case "11":
        graphArcLength();
            break;
            case "12":
        graphAutoRoots();
            break;
            case "13":
    graphAutoMaximum();
    break;

case "14":
    graphAutoMinimum();
    break;

        default:
            display.value = "Cancelled";

    }

}
function graphRoot(){

    try{

        let expression = display.value;

        let guess = Number(prompt("Initial guess for x ="));

        if(isNaN(guess)){

            display.value = "Error";
            return;

        }

        let x = guess;

        for(let i = 0; i < 100; i++){

            let fx = math.evaluate(expression, {x:x});

            let h = 1e-7;

            let dfx =
                (
                    math.evaluate(expression, {x:x+h}) -
                    math.evaluate(expression, {x:x-h})
                ) / (2*h);

            if(Math.abs(dfx) < 1e-12){

                display.value = "No Root";
                return;

            }

            let xNew = x - fx / dfx;

            if(Math.abs(xNew - x) < 1e-12){

                display.value = xNew;
                lastAnswer = xNew;
                return;

            }

            x = xNew;

        }

        display.value = x;
        lastAnswer = x;

    }

    catch{

        display.value = "Graph Error";

    }

}
function graphYIntercept(){

    try{

        let expression = display.value;

        let y = math.evaluate(expression,{x:0});

        display.value = "(0, " + y + ")";

        lastAnswer = y;

    }

    catch{

        display.value = "Graph Error";

    }

}
function graphValue(){

    try{

        let expression = display.value;

        let x = Number(prompt("Enter x value:"));

        if(isNaN(x)){

            display.value = "Error";
            return;

        }

        let y = math.evaluate(expression,{x:x});

        display.value = "f(" + x + ") = " + y;

        lastAnswer = y;

    }

    catch{

        display.value = "Graph Error";

    }

}
function graphIntersection(){

    try{

        let expression1 = prompt(
            "Enter first function\nExample:\nx^2"
        );

        if(expression1 === null) return;

        let expression2 = prompt(
            "Enter second function\nExample:\n2*x+3"
        );

        if(expression2 === null) return;

        let guess = Number(prompt("Initial guess for x ="));

        if(isNaN(guess)){

            display.value = "Error";
            return;

        }

        let x = guess;

        for(let i = 0; i < 100; i++){

            let f =
                math.evaluate(expression1,{x:x}) -
                math.evaluate(expression2,{x:x});

            let h = 1e-7;

            let df =
                (
                    (math.evaluate(expression1,{x:x+h}) -
                     math.evaluate(expression2,{x:x+h}))
                    -
                    (math.evaluate(expression1,{x:x-h}) -
                     math.evaluate(expression2,{x:x-h}))
                ) / (2*h);

            if(Math.abs(df) < 1e-12){

                display.value = "No Intersection";
                return;

            }

            let xNew = x - f / df;

            if(Math.abs(xNew - x) < 1e-12){

                let y = math.evaluate(expression1,{x:xNew});

                display.value =
                    "(" +
                    math.format(xNew,{precision:10}) +
                    ", " +
                    math.format(y,{precision:10}) +
                    ")";

                lastAnswer = xNew;

                return;

            }

            x = xNew;

        }

        display.value = "No Convergence";

    }

    catch{

        display.value = "Graph Error";

    }

}
function graphMaximum(){

    try{

        let expression = display.value;

        let guess = Number(prompt("Initial guess for x ="));

        if(isNaN(guess)){

            display.value = "Error";
            return;

        }

        let x = guess;

        for(let i = 0; i < 100; i++){

            let h = 1e-6;

            let f1 = math.evaluate(expression,{x:x+h});
            let f2 = math.evaluate(expression,{x:x-h});

            let firstDerivative = (f1-f2)/(2*h);

            let secondDerivative =
            (
                math.evaluate(expression,{x:x+h})
                -2*math.evaluate(expression,{x:x})
                +math.evaluate(expression,{x:x-h})
            )/(h*h);

            if(Math.abs(secondDerivative)<1e-12){

                display.value="No Maximum";
                return;

            }

            let xNew = x-firstDerivative/secondDerivative;

            if(Math.abs(xNew-x)<1e-12){

                let y=math.evaluate(expression,{x:xNew});

                if(secondDerivative>=0){

                    display.value="Not Maximum";
                    return;

                }

                display.value=
                "Max=("+
                math.format(xNew,{precision:10})
                +", "+
                math.format(y,{precision:10})
                +")";

                lastAnswer=y;

                return;

            }

            x=xNew;

        }

        display.value="No Convergence";

    }

    catch{

        display.value="Graph Error";

    }

}
function graphMinimum(){

    try{

        let expression = display.value;

        let guess = Number(prompt("Initial guess for x ="));

        if(isNaN(guess)){

            display.value = "Error";
            return;

        }

        let x = guess;

        for(let i = 0; i < 100; i++){

            let h = 1e-6;

            let f1 = math.evaluate(expression,{x:x+h});
            let f2 = math.evaluate(expression,{x:x-h});

            let firstDerivative = (f1-f2)/(2*h);

            let secondDerivative =
            (
                math.evaluate(expression,{x:x+h})
                -2*math.evaluate(expression,{x:x})
                +math.evaluate(expression,{x:x-h})
            )/(h*h);

            if(Math.abs(secondDerivative)<1e-12){

                display.value="No Minimum";
                return;

            }

            let xNew = x-firstDerivative/secondDerivative;

            if(Math.abs(xNew-x)<1e-12){

                let y = math.evaluate(expression,{x:xNew});

                if(secondDerivative<=0){

                    display.value="Not Minimum";
                    return;

                }

                display.value=
                "Min=("+
                math.format(xNew,{precision:10})
                +", "+
                math.format(y,{precision:10})
                +")";

                lastAnswer=y;

                return;

            }

            x=xNew;

        }

        display.value="No Convergence";

    }

    catch{

        display.value="Graph Error";

    }

}
function graphTrace(){

    try{

        let expression = display.value;

        let x = Number(prompt("Trace at x ="));

        if(isNaN(x)){

            display.value = "Error";
            return;

        }

        let y = math.evaluate(expression,{x:x});

        display.value =
            "(" +
            math.format(x,{precision:10}) +
            ", " +
            math.format(y,{precision:10}) +
            ")";

        lastAnswer = y;

    }

    catch{

        display.value = "Graph Error";

    }

}
// Decimal → Binary
function toBinary(){

    try{

        let value = parseInt(display.value);

        if(isNaN(value)){
            display.value="Error";
            return;
        }

        display.value = value.toString(2);

    }

    catch{

        display.value="Error";

    }

}
function graphTangent(){

    try{

        let expression = display.value;

        let x0 = Number(prompt("Point x ="));

        if(isNaN(x0)){

            display.value = "Error";
            return;

        }

        let h = 1e-7;

        let y0 = math.evaluate(expression,{x:x0});

        let slope =
        (
            math.evaluate(expression,{x:x0+h})
            -
            math.evaluate(expression,{x:x0-h})
        )/(2*h);

        let intercept = y0 - slope*x0;

        display.value =
        "y = "
        + math.format(slope,{precision:10})
        + "x "
        + (intercept>=0?"+ ":"- ")
        + math.format(Math.abs(intercept),{precision:10});

        lastAnswer = slope;

    }

    catch{

        display.value="Graph Error";

    }

}
function graphNormal(){

    try{

        let expression = display.value;

        let x0 = Number(prompt("Point x ="));

        if(isNaN(x0)){

            display.value = "Error";
            return;

        }

        let h = 1e-7;

        let y0 = math.evaluate(expression,{x:x0});

        let tangentSlope =
        (
            math.evaluate(expression,{x:x0+h})
            -
            math.evaluate(expression,{x:x0-h})
        )/(2*h);

        if(Math.abs(tangentSlope) < 1e-12){

            display.value = "x = " + math.format(x0,{precision:10});
            lastAnswer = x0;
            return;

        }

        let normalSlope = -1 / tangentSlope;

        let intercept = y0 - normalSlope * x0;

        display.value =
            "y = "
            + math.format(normalSlope,{precision:10})
            + "x "
            + (intercept >= 0 ? "+ " : "- ")
            + math.format(Math.abs(intercept),{precision:10});

        lastAnswer = normalSlope;

    }

    catch{

        display.value = "Graph Error";

    }

}
function graphArea(){

    try{

        let expression = display.value;

        let a = Number(prompt("Lower limit ="));

        let b = Number(prompt("Upper limit ="));

        if(isNaN(a) || isNaN(b)){

            display.value = "Error";
            return;

        }

        let n = 1000;

        let h = (b - a) / n;

        let area = 0;

        for(let i = 0; i <= n; i++){

            let x = a + i * h;

            let y = math.evaluate(expression,{x:x});

            if(i === 0 || i === n){

                area += y;

            }else if(i % 2 === 0){

                area += 2 * y;

            }else{

                area += 4 * y;

            }

        }

        area *= h / 3;

        display.value =
            "Area = " +
            math.format(area,{precision:12});

        lastAnswer = area;

    }

    catch{

        display.value = "Graph Error";

    }

}
function graphArcLength(){

    try{

        let expression = display.value;

        let a = Number(prompt("Lower limit ="));

        let b = Number(prompt("Upper limit ="));

        if(isNaN(a) || isNaN(b)){

            display.value = "Error";
            return;

        }

        let n = 1000;

        let h = (b - a) / n;

        let length = 0;

        for(let i = 0; i < n; i++){

            let x1 = a + i * h;

            let x2 = x1 + h;

            let y1 = math.evaluate(expression,{x:x1});

            let y2 = math.evaluate(expression,{x:x2});

            length += Math.sqrt(
                Math.pow(x2 - x1,2) +
                Math.pow(y2 - y1,2)
            );

        }

        display.value =
            "Length = " +
            math.format(length,{
                precision:12
            });

        lastAnswer = length;

    }

    catch{

        display.value = "Graph Error";

    }

}
function graphAutoRoots(){

    try{

        let expression = display.value;

        let start = Number(prompt("Start x ="));

        let end = Number(prompt("End x ="));

        if(isNaN(start) || isNaN(end) || start >= end){

            display.value = "Error";
            return;

        }

        let roots = [];

        let step = (end - start) / 1000;

        for(let x = start; x < end; x += step){

            let y1 = math.evaluate(expression,{x:x});

            let y2 = math.evaluate(expression,{x:x+step});

            if(y1 === 0){

                roots.push(x);

            }

            else if(y1 * y2 < 0){

                let low = x;
                let high = x + step;

                for(let i = 0; i < 40; i++){

                    let mid = (low + high) / 2;

                    let yMid = math.evaluate(expression,{x:mid});

                    if(y1 * yMid <= 0){

                        high = mid;

                    }else{

                        low = mid;
                        y1 = yMid;

                    }

                }

                roots.push((low + high) / 2);

            }

        }

        if(roots.length === 0){

            display.value = "No Roots";

            return;

        }

        roots = roots.map(r =>
            math.format(r,{precision:10})
        );

        display.value = roots.join(", ");

        lastAnswer = display.value;

    }

    catch{

        display.value = "Graph Error";

    }

}
function graphAutoMaximum(){

    try{

        let expression = display.value;

        let start = Number(prompt("Start x ="));
        let end = Number(prompt("End x ="));

        if(isNaN(start) || isNaN(end) || start >= end){

            display.value = "Error";
            return;

        }

        let maxX = start;
        let maxY = math.evaluate(expression,{x:start});

        let steps = 1000;
        let h = (end-start)/steps;

        for(let i=1;i<=steps;i++){

            let x = start + i*h;
            let y = math.evaluate(expression,{x:x});

            if(y > maxY){

                maxY = y;
                maxX = x;

            }

        }

        display.value =
        "Max=(" +
        math.format(maxX,{precision:10}) +
        ", " +
        math.format(maxY,{precision:10}) +
        ")";

        lastAnswer = maxY;

    }

    catch{

        display.value = "Graph Error";

    }

}
function graphAutoMinimum(){

    try{

        let expression = display.value;

        let start = Number(prompt("Start x ="));
        let end = Number(prompt("End x ="));

        if(isNaN(start) || isNaN(end) || start >= end){

            display.value = "Error";
            return;

        }

        let minX = start;
        let minY = math.evaluate(expression,{x:start});

        let steps = 1000;
        let h = (end-start)/steps;

        for(let i=1;i<=steps;i++){

            let x = start + i*h;
            let y = math.evaluate(expression,{x:x});

            if(y < minY){

                minY = y;
                minX = x;

            }

        }

        display.value =
        "Min=(" +
        math.format(minX,{precision:10}) +
        ", " +
        math.format(minY,{precision:10}) +
        ")";

        lastAnswer = minY;

    }

    catch{

        display.value = "Graph Error";

    }

}
// Decimal → Octal
function toOctal(){

    try{

        let value = parseInt(display.value);

        if(isNaN(value)){
            display.value="Error";
            return;
        }

        display.value = value.toString(8);

    }

    catch{

        display.value="Error";

    }

}

// Decimal → Hexadecimal
function toHex(){

    try{

        let value = parseInt(display.value);

        if(isNaN(value)){
            display.value="Error";
            return;
        }

        display.value = value.toString(16).toUpperCase();

    }

    catch{

        display.value="Error";

    }

}

// Binary → Decimal
function toDecimalBase(){

    try{

        let value = display.value.trim();

        display.value = parseInt(value,2);

    }

    catch{

        display.value="Error";

    }

}
// Matrix Determinant
function matrixDet() {
    
    try {
        
        let input = prompt("Enter matrix\nExample:\n1,2;3,4");
        
        if (input == null) return;
        
        let matrix = input
            .split(";")
            .map(row => row.split(",").map(Number));
        
        let result = math.det(matrix);
        
        display.value = result;
        lastAnswer = result;
        
    }
    
    catch {
        
        display.value = "Error";
        
    }
    
}
// Matrix Transpose
function matrixTranspose(){

    try{

        let matrix = math.evaluate(display.value);

        display.value = math.transpose(matrix).toString();

        lastAnswer = display.value;

    }

    catch{

        display.value = "Error";

    }

}

// Matrix Inverse
function matrixInverse(){

    try{

        let matrix = math.evaluate(display.value);

        display.value = math.inv(matrix).toString();

        lastAnswer = display.value;

    }

    catch{

        display.value = "Error";

    }

}
// Convert text into a complex number
function toComplex(){

    try{

        let z = math.complex(display.value);

        display.value = z.toString();

        lastAnswer = display.value;

    }

    catch{

        display.value = "Error";

    }

}

// Magnitude |z|
function complexAbs(){

    try{

        let z = math.complex(display.value);

        display.value = math.abs(z);

        lastAnswer = Number(display.value);

    }

    catch{

        display.value = "Error";

    }

}

// Complex conjugate
function complexConjugate(){

    try{

        let z = math.complex(display.value);

        display.value = math.conj(z).toString();

        lastAnswer = display.value;

    }

    catch{

        display.value = "Error";

    }

}
// Decimal → Fraction
function toFraction(){

    try{

        let value = Number(display.value);

        if(isNaN(value)){

            display.value = "Error";
            return;

        }

        let tolerance = 1.0E-10;

        let h1 = 1;
        let h2 = 0;
        let k1 = 0;
        let k2 = 1;

        let b = value;

        do{

            let a = Math.floor(b);

            let aux = h1;

            h1 = a * h1 + h2;
            h2 = aux;

            aux = k1;

            k1 = a * k1 + k2;
            k2 = aux;

            b = 1 / (b - a);

        }

        while(Math.abs(value - h1 / k1) > value * tolerance);

        display.value = h1 + "/" + k1;

    }

    catch{

        display.value = "Error";

    }

}

// Fraction → Decimal
function toDecimal(){

    try{

        if(display.value.includes("/")){

            let parts = display.value.split("/");

            let numerator = Number(parts[0]);

            let denominator = Number(parts[1]);

            display.value = numerator / denominator;

        }

    }

    catch{

        display.value = "Error";

    }

}
// Greatest Common Divisor (HCF)
function findHCF(){

    try{

        let input = display.value.split(",");

        if(input.length !== 2){

            display.value = "Use a,b";
            return;

        }

        let a = Number(input[0]);
        let b = Number(input[1]);

        if(!Number.isInteger(a) || !Number.isInteger(b)){

            display.value = "Error";
            return;

        }

        while(b !== 0){

            let temp = b;

            b = a % b;

            a = temp;

        }

        display.value = Math.abs(a);

        lastAnswer = Number(display.value);

    }

    catch(error){

        display.value = "Error";

    }

}

// Least Common Multiple (LCM)
function findLCM(){

    try{

        let input = display.value.split(",");

        if(input.length !== 2){

            display.value = "Use a,b";
            return;

        }

        let a = Number(input[0]);
        let b = Number(input[1]);

        if(!Number.isInteger(a) || !Number.isInteger(b)){

            display.value = "Error";
            return;

        }

        let x = Math.abs(a);
        let y = Math.abs(b);

        let m = x;
        let n = y;

        while(n !== 0){

            let temp = n;

            n = m % n;

            m = temp;

        }

        display.value = (x * y) / m;

        lastAnswer = Number(display.value);

    }

    catch(error){

        display.value = "Error";

    }

}
function lcmCalculator(){

    let a = parseInt(prompt("First integer ="));
    let b = parseInt(prompt("Second integer ="));

    if(isNaN(a) || isNaN(b)){

        alert("Invalid input.");
        return;

    }

    let x = Math.abs(a);
    let y = Math.abs(b);

    let m = x;
    let n = y;

    while(n !== 0){

        let temp = n;
        n = m % n;
        m = temp;

    }

    let lcm = (x * y) / m;

    alert("LCM = " + lcm);

}
// Prime Check
function primeTest(){

    let n = parseInt(prompt("Enter an integer ="));

    if(isNaN(n) || n < 2){

        alert("Not Prime");
        return;

    }

    for(let i = 2; i <= Math.sqrt(n); i++){

        if(n % i === 0){

            alert("Not Prime");
            return;

        }

    }

    alert("Prime");

}
function isPrime(){

    let n = Number(display.value);

    if(!Number.isInteger(n) || n < 2){

        display.value = "Not Prime";
        return;

    }

    for(let i = 2; i <= Math.sqrt(n); i++){

        if(n % i === 0){

            display.value = "Not Prime";
            return;

        }

    }

    display.value = "Prime";

}

// Prime Factorization
function primeFactors(){

    let n = Number(display.value);

    if(!Number.isInteger(n) || n < 2){

        display.value = "Error";
        return;

    }

    let factors = [];

    let divisor = 2;

    while(n >= 2){

        if(n % divisor === 0){

            factors.push(divisor);

            n /= divisor;

        }
        else{

            divisor++;

        }

    }

    display.value = factors.join(" × ");

}
function mean(){

    try{

        let values = display.value.split(",");

        values = values.map(Number);

        if(values.some(isNaN)){

            display.value = "Error";
            return;

        }

        let result = math.mean(values);

        display.value = result;

        lastAnswer = result;

    }

    catch(error){

        display.value = "Error";

    }

}
function solveEquation(){

    try{

        let equation = display.value.replace(/\s/g,"");

        equation = equation.replace(/(\d)([a-zA-Z])/g,"$1*$2");

        if(!equation.includes("=")){
            display.value = "Use =";
            return;
        }

        let parts = equation.split("=");

        let left = "(" + parts[0] + ")";
        let right = "(" + parts[1] + ")";

        let expr = left + "-(" + right + ")";

        // Constant term
        let c = Number(math.evaluate(expr,{x:0}));

        // Value at x = 1
        let f1 = Number(math.evaluate(expr,{x:1}));

        // Value at x = 2
        let f2 = Number(math.evaluate(expr,{x:2}));

        // Quadratic coefficient
        let a = (f2 - 2*f1 + c)/2;

        // Linear coefficient
        let b = f1 - c - a;

        // Linear equation
        if(Math.abs(a) < 1e-12){

            if(Math.abs(b) < 1e-12){

                display.value = "No solution";
                return;

            }

            let x = -c/b;

setPreview("x = " + x);

display.value = "x = " + x;

return;

        }

        // Quadratic equation
        let d = b*b - 4*a*c;

        if(d < 0){

    setPreview("No Real Roots");

    display.value = "No Real Roots";

    return;

}

        let x1 = (-b + Math.sqrt(d))/(2*a);
        let x2 = (-b - Math.sqrt(d))/(2*a);

        display.value = "x₁=" + x1 + "   x₂=" + x2;

    }

    catch(error){

        console.error(error);

        display.value = "Error";

    }

}
function asin(){

    let value = Number(display.value);

    if(isNaN(value) || value < -1 || value > 1){

        display.value = "Error";
        return;

    }

    let result = math.asin(value);

    if(degreeMode)

        result = result * 180 / Math.PI;

    display.value = result;

}

function acos(){

    let value = Number(display.value);

    if(isNaN(value) || value < -1 || value > 1){

        display.value = "Error";
        return;

    }

    let result = math.acos(value);

    if(degreeMode)

        result = result * 180 / Math.PI;

    display.value = result;

}

function atan(){

    let value = Number(display.value);

    if(isNaN(value)){

        display.value = "Error";
        return;

    }

    let result = math.atan(value);

    if(degreeMode)

        result = result * 180 / Math.PI;

    display.value = result;

}
//math.config({

   // number: "BigNumber",//

   // precision: 256//

//});//
math.config({
    number: "BigNumber",
    precision: 256
});

const MathEngine = {

    evaluate(expression){

        expression = expression.replace(/\s+/g, "");

        return this.calculate(expression);

    },

    calculate(expression){

        // Temporary version
        // We'll replace this with a real parser later

        return Function(
            '"use strict"; return (' + expression + ')'
        )();

    }

};



// Stores the last calculated answer


function combination(){

    let input = display.value.split(",");

    if(input.length !== 2){

        display.value = "Use n,r";
        return;

    }

    let n = Number(input[0]);
    let r = Number(input[1]);

    if(
        !Number.isInteger(n) ||
        !Number.isInteger(r) ||
        n < 0 ||
        r < 0 ||
        r > n
    ){

        display.value = "Error";
        return;

    }

    display.value = math.combinations(n, r);

}
function combinationValue(n, r){

    if(r < 0 || r > n)
        return 0;

    r = Math.min(r, n - r);

    let result = 1;

    for(let i = 1; i <= r; i++){

        result *= (n - r + i);
        result /= i;

    }

    return result;

}

function permutation(){

    let input = display.value.split(",");

    if(input.length !== 2){

        display.value = "Use n,r";
        return;

    }

    let n = Number(input[0]);
    let r = Number(input[1]);

    if(
        !Number.isInteger(n) ||
        !Number.isInteger(r) ||
        n < 0 ||
        r < 0 ||
        r > n
    ){

        display.value = "Error";
        return;

    }

    display.value = math.permutations(n, r);

}
function addHistory(exp,ans){

history.unshift({

expression:exp,

answer:ans

});

updateHistory();

localStorage.setItem(
    "calculatorHistory",
    JSON.stringify(history)
);

}

function updateHistory(){

let panel=document.getElementById("historyList");

panel.innerHTML="";

history.forEach(item=>{

let div=document.createElement("div");

div.className="historyItem";

div.innerHTML=

"<b>"+item.expression+
"</b><br>= "+
item.answer;

div.onclick=function(){

display.value=item.answer;

};

panel.appendChild(div);

});

}

function clearHistory() {
  
  history = [];
  
  updateHistory();
  
  localStorage.removeItem("calculatorHistory");
  
}



function sqrt() {
    
    try {
        
        let value = math.evaluate(display.value);
        
        if (value < 0) {
            
            display.value = "Error";
            return;
            
        }
        
        let result = Math.sqrt(value);
        
        finishCalculation("√(" + display.value + ")", result);
        
    }
    
    catch {
        
        display.value = "Error";
        
    }
    
}
function insertSqrt(){

    display.value += "√(";

    smartPreview();   // or updatePreview();

}
function square(){

let value=parseFloat(display.value);

display.value=Math.pow(value,2);
}

function inverse(){

let value=parseFloat(display.value);

display.value=1/value;

}

function power(){

    append("^");

}

function factorial() {
    try {
        const expression = display.value.trim();
        
        if (!/^\d{1,20}$/.test(expression)) {
    display.value = "Enter 1–20 digits";
    return;
}
        
        const n = BigInt(expression);
        console.log("Factorial input:", n.toString());
console.log("Input length:", n.toString().length);
        
        
if (n > 50000n) {
    display.value = "Input too large";
    return;
}

if (n < 0n) {
    display.value = "Factorial requires a non-negative integer";
    return;
}
        function productRange(start, end) {
    if (start > end) return 1n;
    if (start === end) return start;

    if (end - start === 1n) {
        return start * end;
    }

    const mid = (start + end) / 2n;

    return productRange(start, mid) *
           productRange(mid + 1n, end);
}

const result = n < 2n ? 1n : productRange(2n, n);
        
        const exactResult = result.toString();

if (exactResult.length > 15) {
    const firstDigit = exactResult[0];
    const decimalDigits = exactResult.slice(1, 6);
    const exponent = exactResult.length - 1;

    const superscriptDigits = {
        "0": "⁰", "1": "¹", "2": "²", "3": "³",
        "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷",
        "8": "⁸", "9": "⁹"
    };

    const superscriptExponent = String(exponent)
        .split("")
        .map(digit => superscriptDigits[digit])
        .join("");

    display.value =
        firstDigit + "." + decimalDigits +
        "×10" + superscriptExponent;
} else {
    display.value = exactResult;
    updatePreview();
}

document.getElementById("factorialResultText").textContent = exactResult;
document.getElementById("factorialResultPanel").style.display = "block";
    } 
    
    
    catch (error) {
        console.error(error);
        display.value = "Error";
    }
    
}

function factorialValue(n) {
    if (n < 0)
        return NaN;
    
    let result = 1;
    
    for (let i = 2; i <= n; i++)
        result *= i;
    
    return result;
}
function poissonPDF(){

    let lambda = parseFloat(prompt("Mean (λ) ="));
    let x = parseInt(prompt("Number of events (x) ="));

    if(isNaN(lambda) || isNaN(x)){

        alert("Invalid input.");
        return;

    }

    if(lambda <= 0 || x < 0){

        alert("Values must be positive.");
        return;

    }

    let probability =
        Math.exp(-lambda) *
        Math.pow(lambda, x) /
        factorialValue(x);

    alert("Poisson PDF = " + probability);

}
function poissonCDF(){

    let lambda = parseFloat(prompt("Mean (λ) ="));
    let x = parseInt(prompt("Maximum number of events (x) ="));

    if(isNaN(lambda) || isNaN(x)){

        alert("Invalid input.");
        return;

    }

    if(lambda <= 0 || x < 0){

        alert("Values must be positive.");
        return;

    }

    let probability = 0;

    for(let i = 0; i <= x; i++){

        probability +=
            Math.exp(-lambda) *
            Math.pow(lambda, i) /
            factorialValue(i);

    }

    alert("Poisson CDF = " + probability);

}
/* ========= TRIGONOMETRY ========= */

function sin(){

let value=parseFloat(display.value);

if(degreeMode)
value=value*Math.PI/180;

display.value=Math.sin(value);

}

function cos(){

let value=parseFloat(display.value);

if(degreeMode)
value=value*Math.PI/180;

display.value=Math.cos(value);

}

function tan(){

let value=parseFloat(display.value);

if(degreeMode)
value=value*Math.PI/180;

display.value=Math.tan(value);

}

/* ========= LOG FUNCTIONS ========= */

function logValue(){

    let input = display.value.trim();

    if(input.startsWith("(") && input.endsWith(")")){

        let parts = input.slice(1,-1).split(",");

        if(parts.length !== 2){

            display.value = "Error";
            return;

        }

        let base = parseFloat(parts[0]);
        let value = parseFloat(parts[1]);

        if(isNaN(base) || isNaN(value) || base <= 0 || base == 1 || value <= 0){

            display.value = "Error";
            return;

        }

        let result = Math.log(value) / Math.log(base);

        finishCalculation("log(" + base + "," + value + ")", result);

        return;
    }

    let value = parseFloat(input);

    if(isNaN(value) || value <= 0){

        display.value = "Error";
        return;

    }

    let result = Math.log10(value);

    finishCalculation("log(" + value + ")", result);

}

function ln(){

    let value=parseFloat(display.value);

    if(isNaN(value) || value<=0){

        display.value="Error";
        return;

    }

    let result = Math.log(value);

finishCalculation("ln(" + value + ")", result);

}
/* ========= ADVANCED FUNCTIONS ========= */

// Cube
function cubeValue(){

    let value = Number(display.value);

    if(isNaN(value)){

        display.value = "Error";
        return;

    }

    display.value = Math.pow(value, 3);

}
// Cube Root
function cubeRoot(){

    let value = parseFloat(display.value);

    if(!isNaN(value))
        display.value = Math.cbrt(value);

}

// 10^x
function tenPower(){

    let value = parseFloat(display.value);

    if(!isNaN(value))
        display.value = Math.pow(10,value);

}

// e^x
function expPower(){

    let value = parseFloat(display.value);

    if(!isNaN(value))
        display.value = Math.exp(value);

}

// Absolute Value
function absolute(){

    let value = parseFloat(display.value);

    if(!isNaN(value))
        display.value = Math.abs(value);

}

// Change Sign
function plusMinus(){

    let value = Number(display.value);

    if(isNaN(value)){

        display.value = "Error";
        return;

    }

    display.value = -value;

}

// Random Number
function randomValue(){

    display.value = Math.random();

}

/* ========= DEG / RAD MODE ========= */

function toggleMode(){

degreeMode=!degreeMode;

document.getElementById("modeBtn").innerHTML=
degreeMode?"DEG":"RAD";
updateModeIndicator();
}

const canvas = document.getElementById("graphCanvas");

canvas.addEventListener("wheel", function(e){

    e.preventDefault();

    if(e.deltaY < 0){

        graphScale += 2;

    }

    else{

        if(graphScale > 5){

            graphScale -= 2;

        }

    }

    drawGraph();

});
canvas.addEventListener("mousedown",function(e){

    dragging = true;

    lastMouseX = e.offsetX;

    lastMouseY = e.offsetY;

});

canvas.addEventListener("mouseup",function(){

    dragging = false;

});

canvas.addEventListener("mouseleave",function(){

    dragging = false;

});

canvas.addEventListener("mousemove",function(e){

    if(!dragging) return;

    offsetX += e.offsetX - lastMouseX;

    offsetY += e.offsetY - lastMouseY;

    lastMouseX = e.offsetX;

    lastMouseY = e.offsetY;

    drawGraph();

});
/* ========= KEYBOARD SUPPORT ========= */

document.addEventListener("keydown",function(e){

let key=e.key;

if(
(key>='0'&&key<='9')||
['+','-','*','/','%','.','(',')'].includes(key)
){

append(key);

}

else if(key==="Enter"){

e.preventDefault();

calculate();

}

else if(key==="Backspace"){

backspace();

}

else if(key==="Delete"){

clearDisplay();

}

});

/* ========= PREVENT TEXT SELECTION ========= */

document.addEventListener("selectstart",function(e){

e.preventDefault();

});
function tableMode(){

    try{

        let expression = prompt(
            "Enter function in x\nExample:\nx^2+3*x-1"
        );

        if(expression===null) return;

        let start = Number(prompt("Start value"));

        if(isNaN(start)){
            display.value="Error";
            return;
        }

        let end = Number(prompt("End value"));

        if(isNaN(end)){
            display.value="Error";
            return;
        }

        let step = Number(prompt("Step"));

        if(isNaN(step) || step===0){
            display.value="Error";
            return;
        }

        let result = "x\tf(x)\n";

        for(let x=start; x<=end+1e-12; x+=step){

            let y = math.evaluate(expression,{x:x});

            result +=
            x + "\t" +
            math.format(y,{precision:10}) +
            "\n";

        }

        alert(result);

    }

    catch{

        display.value="Error";

    }

}

function polynomialSolver(){

    try{

        let input = prompt(
            "Enter coefficients separated by commas\nExample:\n1,-6,11,-6"
        );

        if(input===null) return;

        let coeff = input.split(",").map(Number);

        if(coeff.some(isNaN)){
            display.value="Error";
            return;
        }

        let roots = math.polynomialRoot(...coeff.reverse());

      roots.sort((a, b) => a - b);
display.value = roots.join(", ");
        lastAnswer = display.value;

    }

    catch (error) {
    console.error("Polynomial solver error:", error);
    display.value = "Error: " + error.message;
}

}
function sequenceMenu(){

    let choice = prompt(

`SEQUENCE MODE

1 = Arithmetic nth Term
2 = Arithmetic Sum
3 = Geometric nth Term
4 = Geometric Sum
5 = Infinite Geometric Sum`

    );

    switch(choice){

        case "1":
            arithmeticNth();
            break;

        case "2":
            arithmeticSum();
            break;

        case "3":
            geometricNth();
            break;

        case "4":
            geometricSum();
            break;

        case "5":
            geometricInfiniteSum();
            break;

        default:
            display.value = "Cancelled";

    }

}

function arithmeticNth(){

    try{

        let a = Number(prompt("First term (a) ="));
        let d = Number(prompt("Common difference (d) ="));
        let n = Number(prompt("Term number (n) ="));

        if(
            isNaN(a) ||
            isNaN(d) ||
            !Number.isInteger(n) ||
            n <= 0
        ){

            display.value = "Error";
            return;

        }

        let result = a + (n - 1) * d;

        display.value = result;

        lastAnswer = result;

    }

    catch{

        display.value = "Error";

    }

}

function arithmeticSum(){

    try{

        let a = Number(prompt("First term (a) ="));
        let d = Number(prompt("Common difference (d) ="));
        let n = Number(prompt("Number of terms (n) ="));

        if(
            isNaN(a) ||
            isNaN(d) ||
            !Number.isInteger(n) ||
            n <= 0
        ){

            display.value = "Error";
            return;

        }

        let result = (n / 2) * (2 * a + (n - 1) * d);

        display.value = result;

        lastAnswer = result;

    }

    catch{

        display.value = "Error";

    }

}

function geometricNth(){

    try{

        let a = Number(prompt("First term (a) ="));
        let r = Number(prompt("Common ratio (r) ="));
        let n = Number(prompt("Term number (n) ="));

        if(
            isNaN(a) ||
            isNaN(r) ||
            !Number.isInteger(n) ||
            n <= 0
        ){

            display.value = "Error";
            return;

        }

        let result = a * Math.pow(r, n - 1);

        display.value = result;

        lastAnswer = result;

    }

    catch{

        display.value = "Error";

    }

}

function geometricSum(){

    try{

        let a = Number(prompt("First term (a) ="));
        let r = Number(prompt("Common ratio (r) ="));
        let n = Number(prompt("Number of terms (n) ="));

        if(
            isNaN(a) ||
            isNaN(r) ||
            !Number.isInteger(n) ||
            n <= 0
        ){

            display.value = "Error";
            return;

        }

        let result;

        if(r === 1){

            result = a * n;

        }else{

            result = a * (1 - Math.pow(r, n)) / (1 - r);

        }

        display.value = result;

        lastAnswer = result;

    }

    catch{

        display.value = "Error";

    }

}

function geometricInfiniteSum(){

    try{

        let a = Number(prompt("First term (a) ="));
        let r = Number(prompt("Common ratio (r) ="));

        if(isNaN(a) || isNaN(r)){

            display.value = "Error";
            return;

        }

        if(Math.abs(r) >= 1){

            display.value = "Diverges";
            return;

        }

        let result = a / (1 - r);

        display.value = result;

        lastAnswer = result;

    }

    catch{

        display.value = "Error";

    }

}
function solverMode(){

    try{

        let equation = prompt(
            "Enter equation\nExample:\nx^3-5*x+1=0"
        );

        if(equation===null) return;

        let guess = Number(prompt("Initial guess"));

        if(isNaN(guess)){
            display.value="Error";
            return;
        }

        let parts = equation.split("=");

        if(parts.length!==2){
            display.value="Use =";
            return;
        }

        let expr =
            "(" + parts[0] + ")-(" + parts[1] + ")";

        let x = guess;

        for(let i=0;i<100;i++){

            let fx = math.evaluate(expr,{x:x});

            let h = 1e-8;

            let dfx =
                (
                    math.evaluate(expr,{x:x+h})
                    -
                    math.evaluate(expr,{x:x-h})
                )/(2*h);

            if(Math.abs(dfx)<1e-12) break;

            let next = x - fx/dfx;

            if(Math.abs(next-x)<1e-12){
                x = next;
                break;
            }

            x = next;

        }

        display.value = Number(x.toFixed(12));

        lastAnswer = Number(display.value);

    }

    catch{

        display.value="Error";

    }

}
function numberTheoryMenu(){

    let choice = prompt(
`NUMBER THEORY

1 = GCD
2 = LCM
3 = Prime Test
4 = Prime Factorization
5 = Modulus
6 = Extended GCD
7 = Euler Totient φ(n)
8 = Modular Inverse
9 = Chinese Remainder Theorem
10 = Modular Exponentiation

Enter choice:`);

    switch(choice){

        case "1":
            gcdCalculator();
            break;

        case "2":
            lcmCalculator();
            break;

        case "3":
            primeTest();
            break;

        case "4":
            primeFactorization();
            break;

        case "5":
            modulusCalculator();
            break;

        case "6":
            extendedGCD();
            break;
        case "7":
            eulerTotient();
            break;
        case "8":
        modularInverse();
            break;
        case "8":
        modularInverse();
            break;
        case "10":
        modularExponentiation();
            break;

    }

}
function modularExponentiation(){

    try{

        let a = Number(prompt("Base (a) ="));
        let b = Number(prompt("Exponent (b) ="));
        let m = Number(prompt("Modulus (m) ="));

        if(!Number.isInteger(a) ||
           !Number.isInteger(b) ||
           !Number.isInteger(m) ||
           b < 0 ||
           m <= 0){

            display.value = "Error";
            return;

        }

        let result = 1;
        a = ((a % m) + m) % m;

        while(b > 0){

            if(b % 2 == 1){

                result = (result * a) % m;

            }

            a = (a * a) % m;

            b = Math.floor(b / 2);

        }

        display.value = result;

        lastAnswer = result;

    }

    catch{

        display.value = "Error";

    }

}
function modularInverse(){

    try{

        let a = Number(prompt("Enter number (a) ="));
        let m = Number(prompt("Enter modulus (m) ="));

        if(!Number.isInteger(a) || !Number.isInteger(m) || m <= 1){

            display.value = "Error";
            return;

        }

        let t = 0;
        let newT = 1;

        let r = m;
        let newR = ((a % m) + m) % m;

        while(newR != 0){

            let q = Math.floor(r / newR);

            [t, newT] = [newT, t - q * newT];
            [r, newR] = [newR, r - q * newR];

        }

        if(r != 1){

            display.value = "No Inverse";
            return;

        }

        if(t < 0)
            t += m;

        display.value = "Inverse = " + t;

        lastAnswer = t;

    }

    catch{

        display.value = "Error";

    }

}
function chineseRemainder(){

    try{

        let n = Number(prompt("Number of congruences ="));

        if(!Number.isInteger(n) || n < 2){

            display.value = "Error";
            return;

        }

        let a = [];
        let m = [];

        for(let i = 0; i < n; i++){

            a.push(Number(prompt("Remainder a" + (i + 1) + " =")));
            m.push(Number(prompt("Modulus m" + (i + 1) + " =")));

            if(!Number.isInteger(a[i]) || !Number.isInteger(m[i]) || m[i] <= 1){

                display.value = "Error";
                return;

            }

        }

        let M = 1;

        for(let i = 0; i < n; i++)
            M *= m[i];

        let x = 0;

        for(let i = 0; i < n; i++){

            let Mi = M / m[i];

            let inv = 0;

            for(let j = 1; j < m[i]; j++){

                if((Mi * j) % m[i] === 1){

                    inv = j;
                    break;

                }

            }

            x += a[i] * Mi * inv;

        }

        x = ((x % M) + M) % M;

        display.value = "x = " + x + " (mod " + M + ")";

        lastAnswer = x;

    }

    catch{

        display.value = "Error";

    }

}
function eulerTotient(){

    try{

        let n = Number(prompt("Enter a positive integer"));

        if(!Number.isInteger(n) || n <= 0){

            display.value = "Error";
            return;

        }

        let result = n;

        let temp = n;

        for(let p = 2; p * p <= temp; p++){

            if(temp % p === 0){

                while(temp % p === 0){

                    temp /= p;

                }

                result *= (1 - 1 / p);

            }

        }

        if(temp > 1){

            result *= (1 - 1 / temp);

        }

        result = Math.round(result);

        display.value = "φ(" + n + ") = " + result;

        lastAnswer = result;

    }

    catch{

        display.value = "Error";

    }

}
function gcdCalculator(){

    let a = parseInt(prompt("First integer ="));
    let b = parseInt(prompt("Second integer ="));

    if(isNaN(a) || isNaN(b)){

        alert("Invalid input.");
        return;

    }

    a = Math.abs(a);
    b = Math.abs(b);

    while(b !== 0){

        let temp = b;
        b = a % b;
        a = temp;

    }

    alert("GCD = " + a);

}
function modulusCalculator(){

    let a = parseInt(prompt("Dividend ="));
    let b = parseInt(prompt("Divisor ="));

    if(isNaN(a) || isNaN(b) || b === 0){

        alert("Invalid input.");
        return;

    }

    alert("Remainder = " + (a % b));

}
function extendedGCD(){

    let a = parseInt(prompt("First integer ="));
    let b = parseInt(prompt("Second integer ="));

    if(isNaN(a) || isNaN(b)){

        alert("Invalid input.");
        return;

    }

    let old_r = a;
    let r = b;

    let old_s = 1;
    let s = 0;

    let old_t = 0;
    let t = 1;

    while(r !== 0){

        let q = Math.floor(old_r / r);

        let temp = r;
        r = old_r - q * r;
        old_r = temp;

        temp = s;
        s = old_s - q * s;
        old_s = temp;

        temp = t;
        t = old_t - q * t;
        old_t = temp;

    }

    alert(
        "GCD = " + old_r +
        "\n\nx = " + old_s +
        "\ny = " + old_t +
        "\n\nVerification:\n" +
        a + "(" + old_s + ") + " +
        b + "(" + old_t + ") = " + old_r
    );

}
function quartiles(){

    let data = prompt("Enter values separated by commas:");

    if(!data){
        alert("No data");
        return;
    }

    let values = data.split(",").map(Number);

    if(values.some(isNaN)){
        alert("Invalid data");
        return;
    }

    values.sort((a,b)=>a-b);

    let n = values.length;

    let q2;

    if(n % 2 === 0)
        q2 = (values[n/2-1] + values[n/2])/2;
    else
        q2 = values[Math.floor(n/2)];


    let lower = values.slice(0, Math.floor(n/2));
    let upper = values.slice(Math.ceil(n/2));


    function median(arr){

        let m = arr.length;

        if(m % 2 === 0)
            return (arr[m/2-1]+arr[m/2])/2;

        return arr[Math.floor(m/2)];

    }


    let q1 = median(lower);
    let q3 = median(upper);


    alert(
        "Q1 = " + q1 +
        "\nQ2 = " + q2 +
        "\nQ3 = " + q3
    );

}
function programmingMenu(){

    let choice = prompt(

`PROGRAMMING MODE

1 = AND
2 = OR
3 = XOR
4 = NOT
5 = Left Shift
6 = Right Shift
7 = Binary ↔ Decimal
8 = Decimal ↔ Hexadecimal
9 = Decimal ↔ Octal
10 = Bit Count

Enter choice:`
    );

    switch(choice){

        case "1":
            bitwiseAND();
            break;

        case "2":
            bitwiseOR();
            break;

        case "3":
            bitwiseXOR();
            break;

        case "4":
            bitwiseNOT();
            break;

        case "5":
            leftShift();
            break;

        case "6":
            rightShift();
            break;

        case "7":
            binaryDecimal();
            break;

        case "8":
            decimalHex();
            break;

        case "9":
            decimalOctal();
            break;

        case "10":
            bitCount();
            break;

        default:
            display.value = "Cancelled";

    }

}
function bitwiseAND(){

    try{

        let a = Number(prompt("First integer ="));
        let b = Number(prompt("Second integer ="));

        if(!Number.isInteger(a) || !Number.isInteger(b)){

            display.value = "Error";
            return;

        }

        let result = a & b;

        display.value = result;

        lastAnswer = result;

    }

    catch{

        display.value = "Error";

    }

}
function bitwiseOR(){

    try{

        let a = Number(prompt("First integer ="));
        let b = Number(prompt("Second integer ="));

        if(!Number.isInteger(a) || !Number.isInteger(b)){

            display.value = "Error";
            return;

        }

        let result = a | b;

        display.value = result;

        lastAnswer = result;

    }

    catch{

        display.value = "Error";

    }

}
function bitwiseXOR(){

    try{

        let a = Number(prompt("First integer ="));
        let b = Number(prompt("Second integer ="));

        if(!Number.isInteger(a) || !Number.isInteger(b)){

            display.value = "Error";
            return;

        }

        let result = a ^ b;

        display.value = result;

        lastAnswer = result;

    }

    catch{

        display.value = "Error";

    }

}
function bitwiseNOT(){

    try{

        let a = Number(prompt("Enter integer ="));

        if(!Number.isInteger(a)){

            display.value = "Error";
            return;

        }

        let result = ~a;

        display.value = result;

        lastAnswer = result;

    }

    catch{

        display.value = "Error";

    }

}
function leftShift(){

    try{

        let a = Number(prompt("Enter integer ="));
        let n = Number(prompt("Number of bits to shift ="));

        if(!Number.isInteger(a) ||
           !Number.isInteger(n) ||
           n < 0){

            display.value = "Error";
            return;

        }

        let result = a << n;

        display.value = result;

        lastAnswer = result;

    }

    catch{

        display.value = "Error";

    }

}
function rightShift(){

    try{

        let a = Number(prompt("Enter integer ="));
        let n = Number(prompt("Number of bits to shift ="));

        if(!Number.isInteger(a) ||
           !Number.isInteger(n) ||
           n < 0){

            display.value = "Error";
            return;

        }

        let result = a >> n;

        display.value = result;

        lastAnswer = result;

    }

    catch{

        display.value = "Error";

    }

}
function binaryDecimal(){

    try{

        let choice = prompt(

`BINARY ↔ DECIMAL

1 = Binary → Decimal
2 = Decimal → Binary

Enter choice:`
        );

        if(choice=="1"){

            let binary = prompt("Enter binary number =");

            if(binary===null) return;

            if(!/^[01]+$/.test(binary)){

                display.value="Error";
                return;

            }

            let result = parseInt(binary,2);

            display.value=result;

            lastAnswer=result;

        }

        else if(choice=="2"){

            let decimal = Number(prompt("Enter decimal integer ="));

            if(!Number.isInteger(decimal)){

                display.value="Error";
                return;

            }

            let result = decimal.toString(2);

            display.value=result;

            lastAnswer=result;

        }

        else{

            display.value="Cancelled";

        }

    }

    catch{

        display.value="Error";

    }

}
function decimalHex(){

    try{

        let choice = prompt(

`DECIMAL ↔ HEXADECIMAL

1 = Decimal → Hexadecimal
2 = Hexadecimal → Decimal

Enter choice:`
        );

        if(choice=="1"){

            let decimal = Number(prompt("Enter decimal integer ="));

            if(!Number.isInteger(decimal)){

                display.value="Error";
                return;

            }

            let result = decimal.toString(16).toUpperCase();

            display.value=result;

            lastAnswer=result;

        }

        else if(choice=="2"){

            let hex = prompt("Enter hexadecimal number =");

            if(hex===null) return;

            if(!/^[0-9A-Fa-f]+$/.test(hex)){

                display.value="Error";
                return;

            }

            let result = parseInt(hex,16);

            display.value=result;

            lastAnswer=result;

        }

        else{

            display.value="Cancelled";

        }

    }

    catch{

        display.value="Error";

    }

}
function decimalOctal(){

    try{

        let choice = prompt(

`DECIMAL ↔ OCTAL

1 = Decimal → Octal
2 = Octal → Decimal

Enter choice:`
        );

        if(choice=="1"){

            let decimal = Number(prompt("Enter decimal integer ="));

            if(!Number.isInteger(decimal)){

                display.value="Error";
                return;

            }

            let result = decimal.toString(8);

            display.value=result;

            lastAnswer=result;

        }

        else if(choice=="2"){

            let octal = prompt("Enter octal number =");

            if(octal===null) return;

            if(!/^[0-7]+$/.test(octal)){

                display.value="Error";
                return;

            }

            let result = parseInt(octal,8);

            display.value=result;

            lastAnswer=result;

        }

        else{

            display.value="Cancelled";

        }

    }

    catch{

        display.value="Error";

    }

}
function bitCount(){

    try{

        let n = Number(prompt("Enter a non-negative integer ="));

        if(!Number.isInteger(n) || n < 0){

            display.value = "Error";
            return;

        }

        let count = 0;
        let temp = n;

        while(temp > 0){

            count += temp & 1;
            temp >>= 1;

        }

        display.value = "Number of set bits = " + count;

        lastAnswer = count;

    }

    catch{

        display.value = "Error";

    }

}

function periodicTable(){

    let choice = prompt(

`PERIODIC TABLE

1 = Search by Atomic Number
2 = Search by Symbol
3 = Search by Name
4 = List All Elements

Enter choice:`
    );

    switch(choice){

        case "1":
            searchAtomicNumber();
            break;

        case "2":
            searchSymbol();
            break;

        case "3":
            searchName();
            break;

        case "4":
            listElements();
            break;

        default:
            display.value = "Cancelled";

    }

}
function searchAtomicNumber(){

    try{

        let number = Number(prompt("Enter Atomic Number"));

        if(!Number.isInteger(number) || number < 1){

            display.value = "Error";
            return;

        }

        let element = periodicElements.find(
            e => e.atomicNumber === number
        );

        if(!element){

            display.value = "Element Not Found";
            return;

        }

        display.value =
element.name +
" | " +
element.symbol +
" | Z=" + element.atomicNumber +
" | Mass=" + element.mass +
" | G=" + element.group +
" | P=" + element.period;

        lastAnswer = display.value;

    }

    catch{

        display.value = "Error";

    }

}
function searchSymbol(){

    try{

        let symbol = prompt("Enter Element Symbol");

        if(symbol===null) return;

        symbol = symbol.trim();

        let element = periodicElements.find(
            e => e.symbol.toUpperCase() === symbol.toUpperCase()
        );

        if(!element){

            display.value = "Element Not Found";
            return;

        }

        display.value =
        element.name +
        " | " +
        element.symbol +
        " | Z=" + element.atomicNumber +
        " | Mass=" + element.mass +
        " | G=" + element.group +
        " | P=" + element.period;

        lastAnswer = display.value;

    }

    catch{

        display.value = "Error";

    }

}
function searchName(){

    try{

        let name = prompt("Enter Element Name");

        if(name===null) return;

        name = name.trim();

        let element = periodicElements.find(
            e => e.name.toUpperCase() === name.toUpperCase()
        );

        if(!element){

            display.value = "Element Not Found";
            return;

        }

        display.value =
        element.name +
        " | " +
        element.symbol +
        " | Z=" + element.atomicNumber +
        " | Mass=" + element.mass +
        " | G=" + element.group +
        " | P=" + element.period;

        lastAnswer = display.value;

    }

    catch{

        display.value = "Error";

    }

}
function listElements(){

    try{

        let page = 0;
        let perPage = 20;

        while(true){

            let start = page * perPage;
            let end = Math.min(start + perPage, periodicElements.length);

            let result = "";

            for(let i = start; i < end; i++){

                let e = periodicElements[i];

                result +=
                e.atomicNumber + ". " +
                e.symbol + " - " +
                e.name + "\n";

            }

            let action = prompt(
                result +
                "\nN = Next Page\nP = Previous Page\nQ = Quit"
            );

            if(action === null || action.toUpperCase() === "Q") break;

            if(action.toUpperCase() === "N" && end < periodicElements.length){

                page++;

            }

            else if(action.toUpperCase() === "P" && page > 0){

                page--;

            }

        }

        display.value = "Periodic Table Closed";

    }

    catch{

        display.value = "Error";

    }

}
function chemistryMenu(){

    let choice = prompt(
`CHEMISTRY (1/2)

1 = Periodic Table
2 = Molecular Mass
3 = Percentage Composition
4 = Empirical Formula
5 = Molecular Formula
6 = Molarity
7 = Molality
8 = Normality
9 = Dilution
10 = pH Calculator
11 = Ideal Gas Law
12 = Combined Gas Law
13 = Charles' Law
14 = Boyle's Law
15 = Gay-Lussac's Law
16 = Density
17 = Heat (q = mcΔT)
18 = Half-Life
19 = Electron Configuration
20 = More...

Enter choice:`);

    if(choice=="1"){
        periodicTable();
    }
    else if(choice=="2"){
        molecularMass();
    }
    else if(choice=="3"){
        percentageComposition();
    }
    else if(choice=="4"){
        empiricalFormula();
    }
    else if(choice=="5"){
        molecularFormula();
    }
    else if(choice=="6"){
        molarity();
    }
    else if(choice=="7"){
        molality();
    }
    else if(choice=="8"){
        normality();
    }
    else if(choice=="9"){
        dilution();
    }
    else if(choice=="10"){
        pHCalculator();
    }
    else if(choice=="11"){
        idealGasLaw();
    }
    else if(choice=="12"){
        combinedGasLaw();
    }
    else if(choice=="13"){
        charlesLaw();
    }
    else if(choice=="14"){
        boylesLaw();
    }
    else if(choice=="15"){
        gayLussacLaw();
    }
    else if(choice=="16"){
        densityCalculator();
    }
    else if(choice=="17"){
        heatCalculator();
    }
    else if(choice=="18"){
        halfLifeCalculator();
    }
    else if(choice=="19"){
        electronConfiguration();
    }
    else if(choice=="20"){
    chemistryMenu2();
    }
    

}
function chemistryMenu2(){

    let choice = prompt(
`CHEMISTRY (2/2)

21 = Oxidation Number
22 = Stoichiometry
23 = Limiting Reagent
24 = Balancing Equations
25 = Unit Converter
26 = Chemical Constants
27 = Orbital Diagram
28 = Reaction Type Identifier
29 = Solubility Rules
30 = Periodic Trends Calculator

Enter choice:`);

    if(choice=="21"){
        oxidationNumber();
    }
    else if(choice=="22"){
        stoichiometry();
    }
    else if(choice=="23"){
        limitingReagent();
    }
    else if(choice=="24"){
        balanceEquation();
    }
    else if(choice=="25"){
        chemistryUnitConverter();
    }
    else if(choice=="26"){
        chemicalConstants();
    }
    else if(choice=="27"){
        orbitalDiagram();
    }
    else if(choice=="28"){
    reactionTypeIdentifier();
    }
    else if(choice=="29"){
    solubilityRules();
    }
    else if (choice == "30") {
    periodicTrendsCalculator();
    }

}
function periodicTrendsCalculator(){

    try{

        let symbol = prompt(
        "Enter Element Symbol\nExample: H, Na, Fe, Cl");

        if(symbol==null) return;

        symbol = symbol.trim();

        let element = periodicElements.find(
            e => e.symbol.toLowerCase() === symbol.toLowerCase()
        );

        if(!element){

            display.value = "Element Not Found";
            return;

        }

        display.value =
element.name +
" | Group: " + element.group +
" | Period: " + element.period +
" | Block: " + element.block +
" | Category: " + element.category;
    }

    catch{

        display.value = "Error";

    }

}
function reactionTypeIdentifier(){

    try{

        let equation = prompt(
"Enter Chemical Equation\nExample:\n2H2 + O2 -> 2H2O");

        if(equation==null) return;

        equation = equation.replace(/\s/g,"");

        if(!equation.includes("->")){

            display.value="Invalid Equation";
            return;

        }

        let parts = equation.split("->");

        let reactants = parts[0].split("+");
        let products = parts[1].split("+");

        let type="Unknown";

        if(reactants.length==2 && products.length==1){

            type="Combination (Synthesis)";

        }

        else if(reactants.length==1 && products.length>=2){

            type="Decomposition";

        }

        else if(reactants.length==2 && products.length==2){

            if(equation.includes("O2")){

                type="Combustion";

            }

            else{

                type="Double Displacement";

            }

        }

        display.value=type;

    }

    catch{

        display.value="Error";

    }

}
function solubilityRules(){

    try{

        let compound = prompt(
"Enter Compound\nExample: NaCl, AgCl, BaSO4");

        if(compound==null) return;

        compound = compound.trim();

        let result = "";

        if(compound.includes("NO3")){

            result = "Soluble";

        }

        else if(compound.includes("NH4")){

            result = "Soluble";

        }

        else if(compound.startsWith("Na") ||
                compound.startsWith("K") ||
                compound.startsWith("Li")){

            result = "Soluble";

        }

        else if(compound=="AgCl"){

            result = "Insoluble";

        }

        else if(compound=="BaSO4"){

            result = "Insoluble";

        }

        else if(compound=="PbSO4"){

            result = "Insoluble";

        }

        else if(compound=="CaCO3"){

            result = "Insoluble";

        }

        else{

            result = "Rule Not Found";

        }

        display.value = result;

    }

    catch{

        display.value = "Error";

    }

}
function molecularMass(){

    try{

        let formula = prompt(
        "Enter Chemical Formula\nExample: H2O");

        if(formula===null) return;

        formula = formula.trim();

        let totalMass = calculateFormulaMass(formula);

        display.value =
        "Molar Mass = " +
        totalMass.toFixed(5) +
        " g/mol";

        lastAnswer = totalMass;

    }

    catch{

        display.value = "Error";

    }

}
function calculateFormulaMass(formula){

    let stack = [0];

    let i = 0;

    while(i < formula.length){

        if(formula[i] == "("){

            stack.push(0);
            i++;

        }

        else if(formula[i] == ")"){

            i++;

            let number = "";

            while(i < formula.length && /\d/.test(formula[i])){

                number += formula[i];
                i++;

            }

            let multiplier = number=="" ? 1 : parseInt(number);

            let groupMass = stack.pop();

            stack[stack.length-1] += groupMass * multiplier;

        }

        else{

            let symbol = formula[i];
            i++;

            if(i<formula.length && /[a-z]/.test(formula[i])){

                symbol += formula[i];
                i++;

            }

            let number = "";

            while(i<formula.length && /\d/.test(formula[i])){

                number += formula[i];
                i++;

            }

            let count = number=="" ? 1 : parseInt(number);

            let element = periodicElements.find(
                e=>e.symbol===symbol
            );

            if(!element){

                throw new Error("Unknown Element");

            }

            stack[stack.length-1] += element.mass * count;

        }

    }

    return stack[0];

}
function percentageComposition(){

    try{

        let formula = prompt(
        "Enter Chemical Formula\nExample: H2SO4");

        if(formula===null) return;

        formula = formula.trim();

        let totalMass = calculateFormulaMass(formula);

        let regex = /([A-Z][a-z]?)(\d*)/g;

        let result = "";

        let match;

        while((match = regex.exec(formula)) !== null){

            let symbol = match[1];

            let count = match[2]=="" ? 1 : parseInt(match[2]);

            let element = periodicElements.find(
                e=>e.symbol===symbol
            );

            let percent =
            (element.mass*count/totalMass)*100;

            result +=
            symbol +
            " = " +
            percent.toFixed(2) +
            "%\n";

        }

        alert(result);

        display.value = "Done";

    }

    catch{

        display.value = "Error";

    }

}
function empiricalFormula(){

    try{

        alert(
        "Empirical Formula Calculator\n\n" +
        "This feature will calculate the simplest whole-number formula " +
        "from the masses or percentages of elements."
        );

        display.value = "Coming Soon";

    }

    catch{

        display.value = "Error";

    }

}
function molecularFormula(){

    try{

        let empirical = prompt(
        "Enter Empirical Formula\nExample: CH2O");

        if(empirical===null) return;

        let molarMass = parseFloat(
        prompt("Enter Molecular Mass (g/mol)"));

        if(isNaN(molarMass)){

            display.value = "Error";
            return;

        }

        display.value = "Coming Soon";

    }

    catch{

        display.value = "Error";

    }

}
function molarity(){

    try{

        let moles = parseFloat(
        prompt("Enter moles of solute"));

        let volume = parseFloat(
        prompt("Enter volume of solution (L)"));

        if(isNaN(moles) || isNaN(volume) || volume<=0){

            display.value="Error";
            return;

        }

        let M = moles/volume;

        display.value =
        "Molarity = " +
        M.toFixed(10) +
        " mol/L";

        lastAnswer = M;

    }

    catch{

        display.value="Error";

    }

}
function normality(){

    try{

        let equivalents = parseFloat(
        prompt("Enter number of equivalents"));

        let volume = parseFloat(
        prompt("Enter volume of solution (L)"));

        if(isNaN(equivalents) || isNaN(volume) || volume<=0){

            display.value = "Error";
            return;

        }

        let N = equivalents / volume;

        display.value =
        "Normality = " +
        N.toFixed(10) +
        " N";

        lastAnswer = N;

    }

    catch{

        display.value = "Error";

    }

}
function dilution(){

    try{

        let M1 = parseFloat(prompt("Enter Initial Concentration (M1)"));
        let V1 = parseFloat(prompt("Enter Initial Volume (V1)"));
        let M2 = parseFloat(prompt("Enter Final Concentration (M2)"));

        if(isNaN(M1) || isNaN(V1) || isNaN(M2) || M2===0){

            display.value = "Error";
            return;

        }

        let V2 = (M1 * V1) / M2;

        display.value =
        "Final Volume = " +
        V2.toFixed(10);

        lastAnswer = V2;

    }

    catch{

        display.value = "Error";

    }

}
function pHCalculator(){

    try{

        let choice = prompt(

`pH CALCULATOR

1 = Find pH from [H+]
2 = Find pOH from [OH-]
3 = Find [H+] from pH
4 = Find [OH-] from pOH`

        );

        if(choice=="1"){

            let H = parseFloat(
            prompt("Enter [H+] concentration (mol/L)"));

            if(isNaN(H) || H<=0){

                display.value="Error";
                return;

            }

            let pH = -Math.log10(H);

            display.value =
            "pH = " + pH.toFixed(10);

            lastAnswer = pH;

        }

        else if(choice=="2"){

            let OH = parseFloat(
            prompt("Enter [OH-] concentration (mol/L)"));

            if(isNaN(OH) || OH<=0){

                display.value="Error";
                return;

            }

            let pOH = -Math.log10(OH);

            display.value =
            "pOH = " + pOH.toFixed(10);

            lastAnswer = pOH;

        }

        else if(choice=="3"){

            let pH = parseFloat(prompt("Enter pH"));

            let H = Math.pow(10,-pH);

            display.value =
            "[H+] = " + H.toExponential(6) + " mol/L";

            lastAnswer = H;

        }

        else if(choice=="4"){

            let pOH = parseFloat(prompt("Enter pOH"));

            let OH = Math.pow(10,-pOH);

            display.value =
            "[OH-] = " + OH.toExponential(6) + " mol/L";

            lastAnswer = OH;

        }

        else{

            display.value="Cancelled";

        }

    }

    catch{

        display.value="Error";

    }

}
function combinedGasLaw(){

    try{

        let choice = prompt(

`COMBINED GAS LAW

1 = Find P2
2 = Find V2
3 = Find T2`

        );

        let P1,V1,T1,P2,V2,T2;

        if(choice=="1"){

            P1 = parseFloat(prompt("Enter P1 (atm)"));
            V1 = parseFloat(prompt("Enter V1 (L)"));
            T1 = parseFloat(prompt("Enter T1 (K)"));
            V2 = parseFloat(prompt("Enter V2 (L)"));
            T2 = parseFloat(prompt("Enter T2 (K)"));

            P2 = (P1*V1*T2)/(T1*V2);

            display.value = "P2 = " + P2.toFixed(10) + " atm";

            lastAnswer = P2;

        }

        else if(choice=="2"){

            P1 = parseFloat(prompt("Enter P1 (atm)"));
            V1 = parseFloat(prompt("Enter V1 (L)"));
            T1 = parseFloat(prompt("Enter T1 (K)"));
            P2 = parseFloat(prompt("Enter P2 (atm)"));
            T2 = parseFloat(prompt("Enter T2 (K)"));

            V2 = (P1*V1*T2)/(T1*P2);

            display.value = "V2 = " + V2.toFixed(10) + " L";

            lastAnswer = V2;

        }

        else if(choice=="3"){

            P1 = parseFloat(prompt("Enter P1 (atm)"));
            V1 = parseFloat(prompt("Enter V1 (L)"));
            T1 = parseFloat(prompt("Enter T1 (K)"));
            P2 = parseFloat(prompt("Enter P2 (atm)"));
            V2 = parseFloat(prompt("Enter V2 (L)"));

            T2 = (P2*V2*T1)/(P1*V1);

            display.value = "T2 = " + T2.toFixed(10) + " K";

            lastAnswer = T2;

        }

        else{

            display.value = "Cancelled";

        }

    }

    catch{

        display.value = "Error";

    }

}
function charlesLaw(){

    try{

        let choice = prompt(

`CHARLES' LAW

1 = Find V2
2 = Find T2`

        );

        let V1,T1,V2,T2;

        if(choice=="1"){

            V1 = parseFloat(prompt("Enter V1 (L)"));
            T1 = parseFloat(prompt("Enter T1 (K)"));
            T2 = parseFloat(prompt("Enter T2 (K)"));

            if(isNaN(V1)||isNaN(T1)||isNaN(T2)||T1<=0){

                display.value="Error";
                return;

            }

            V2 = (V1*T2)/T1;

            display.value =
            "V2 = " +
            V2.toFixed(10) +
            " L";

            lastAnswer = V2;

        }

        else if(choice=="2"){

            V1 = parseFloat(prompt("Enter V1 (L)"));
            T1 = parseFloat(prompt("Enter T1 (K)"));
            V2 = parseFloat(prompt("Enter V2 (L)"));

            if(isNaN(V1)||isNaN(T1)||isNaN(V2)||V1<=0){

                display.value="Error";
                return;

            }

            T2 = (V2*T1)/V1;

            display.value =
            "T2 = " +
            T2.toFixed(10) +
            " K";

            lastAnswer = T2;

        }

        else{

            display.value="Cancelled";

        }

    }

    catch{

        display.value="Error";

    }

}
function boylesLaw(){

    try{

        let choice = prompt(

`BOYLE'S LAW

1 = Find P2
2 = Find V2`

        );

        let P1,V1,P2,V2;

        if(choice=="1"){

            P1 = parseFloat(prompt("Enter P1 (atm)"));
            V1 = parseFloat(prompt("Enter V1 (L)"));
            V2 = parseFloat(prompt("Enter V2 (L)"));

            if(isNaN(P1)||isNaN(V1)||isNaN(V2)||V2<=0){

                display.value="Error";
                return;

            }

            P2 = (P1*V1)/V2;

            display.value =
            "P2 = " +
            P2.toFixed(10) +
            " atm";

            lastAnswer = P2;

        }

        else if(choice=="2"){

            P1 = parseFloat(prompt("Enter P1 (atm)"));
            V1 = parseFloat(prompt("Enter V1 (L)"));
            P2 = parseFloat(prompt("Enter P2 (atm)"));

            if(isNaN(P1)||isNaN(V1)||isNaN(P2)||P2<=0){

                display.value="Error";
                return;

            }

            V2 = (P1*V1)/P2;

            display.value =
            "V2 = " +
            V2.toFixed(10) +
            " L";

            lastAnswer = V2;

        }

        else{

            display.value="Cancelled";

        }

    }

    catch{

        display.value="Error";

    }

}
function gayLussacLaw(){

    try{

        let choice = prompt(

`GAY-LUSSAC'S LAW

1 = Find P2
2 = Find T2`

        );

        let P1,T1,P2,T2;

        if(choice=="1"){

            P1 = parseFloat(prompt("Enter P1 (atm)"));
            T1 = parseFloat(prompt("Enter T1 (K)"));
            T2 = parseFloat(prompt("Enter T2 (K)"));

            if(isNaN(P1)||isNaN(T1)||isNaN(T2)||T1<=0){

                display.value="Error";
                return;

            }

            P2 = (P1*T2)/T1;

            display.value =
            "P2 = " +
            P2.toFixed(10) +
            " atm";

            lastAnswer = P2;

        }

        else if(choice=="2"){

            P1 = parseFloat(prompt("Enter P1 (atm)"));
            T1 = parseFloat(prompt("Enter T1 (K)"));
            P2 = parseFloat(prompt("Enter P2 (atm)"));

            if(isNaN(P1)||isNaN(T1)||isNaN(P2)||P1<=0){

                display.value="Error";
                return;

            }

            T2 = (P2*T1)/P1;

            display.value =
            "T2 = " +
            T2.toFixed(10) +
            " K";

            lastAnswer = T2;

        }

        else{

            display.value="Cancelled";

        }

    }

    catch{

        display.value="Error";

    }

}
function densityCalculator(){

    try{

        let choice = prompt(

`DENSITY

1 = Find Density
2 = Find Mass
3 = Find Volume`

        );

        let density,mass,volume;

        if(choice=="1"){

            mass = parseFloat(prompt("Enter Mass (g)"));
            volume = parseFloat(prompt("Enter Volume (cm³ or mL)"));

            if(isNaN(mass)||isNaN(volume)||volume<=0){

                display.value="Error";
                return;

            }

            density = mass/volume;

            display.value =
            "Density = " +
            density.toFixed(10) +
            " g/cm³";

            lastAnswer = density;

        }

        else if(choice=="2"){

            density = parseFloat(prompt("Enter Density (g/cm³)"));
            volume = parseFloat(prompt("Enter Volume (cm³ or mL)"));

            if(isNaN(density)||isNaN(volume)){

                display.value="Error";
                return;

            }

            mass = density*volume;

            display.value =
            "Mass = " +
            mass.toFixed(10) +
            " g";

            lastAnswer = mass;

        }

        else if(choice=="3"){

            density = parseFloat(prompt("Enter Density (g/cm³)"));
            mass = parseFloat(prompt("Enter Mass (g)"));

            if(isNaN(density)||isNaN(mass)||density<=0){

                display.value="Error";
                return;

            }

            volume = mass/density;

            display.value =
            "Volume = " +
            volume.toFixed(10) +
            " cm³";

            lastAnswer = volume;

        }

        else{

            display.value="Cancelled";

        }

    }

    catch{

        display.value="Error";

    }

}
function specificGravity(){

    try{

        let choice = prompt(

`SPECIFIC GRAVITY

1 = Find Specific Gravity
2 = Find Density`

        );

        let sg,density;

        if(choice=="1"){

            density = parseFloat(
            prompt("Enter Density (g/cm³)"));

            if(isNaN(density)||density<=0){

                display.value="Error";
                return;

            }

            sg = density/1.0;

            display.value =
            "Specific Gravity = " +
            sg.toFixed(10);

            lastAnswer = sg;

        }

        else if(choice=="2"){

            sg = parseFloat(
            prompt("Enter Specific Gravity"));

            if(isNaN(sg)||sg<=0){

                display.value="Error";
                return;

            }

            density = sg*1.0;

            display.value =
            "Density = " +
            density.toFixed(10) +
            " g/cm³";

            lastAnswer = density;

        }

        else{

            display.value="Cancelled";

        }

    }

    catch{

        display.value="Error";

    }

}
function stoichiometryMenu(){

    let choice = prompt(

`STOICHIOMETRY

1 = Mass → Moles
2 = Moles → Mass
3 = Moles → Particles
4 = Particles → Moles
5 = Mass → Particles
6 = Particles → Mass
7 = Limiting Reagent
8 = Theoretical Yield
9 = Percent Yield`

    );

    switch(choice){

        case "1":
            massToMoles();
            break;

        case "2":
            molesToMass();
            break;

        case "3":
            molesToParticles();
            break;

        case "4":
            particlesToMoles();
            break;

        case "5":
            massToParticles();
            break;

        case "6":
            particlesToMass();
            break;

        case "7":
            limitingReagent();
            break;

        case "8":
            theoreticalYield();
            break;

        case "9":
            percentYield();
            break;

        default:
            display.value="Cancelled";

    }

}
function massToMoles(){

    try{

        let formula = prompt(
        "Enter Chemical Formula");

        if(formula===null) return;

        formula = formula.trim();

        let mass = parseFloat(
        prompt("Enter Mass (g)"));

        if(isNaN(mass)||mass<=0){

            display.value="Error";
            return;

        }

        let molarMass = calculateFormulaMass(formula);

        let moles = mass/molarMass;

        display.value =
        "Moles = " +
        moles.toFixed(10) +
        " mol";

        lastAnswer = moles;

    }

    catch{

        display.value="Error";

    }

}
function molesToMass(){

    try{

        let formula = prompt(
        "Enter Chemical Formula");

        if(formula===null) return;

        formula = formula.trim();

        let moles = parseFloat(
        prompt("Enter Moles"));

        if(isNaN(moles)||moles<=0){

            display.value="Error";
            return;

        }

        let molarMass = calculateFormulaMass(formula);

        let mass = moles*molarMass;

        display.value =
        "Mass = " +
        mass.toFixed(10) +
        " g";

        lastAnswer = mass;

    }

    catch{

        display.value="Error";

    }

}
function molesToParticles(){

    try{

        const AVOGADRO = 6.02214076e23;

        let moles = parseFloat(
        prompt("Enter Moles"));

        if(isNaN(moles)||moles<0){

            display.value="Error";
            return;

        }

        let particles = moles * AVOGADRO;

        display.value =
        "Particles = " +
        particles.toExponential(10);

        lastAnswer = particles;

    }

    catch{

        display.value="Error";

    }

}
function particlesToMoles(){

    try{

        const AVOGADRO = 6.02214076e23;

        let particles = parseFloat(
        prompt("Enter Number of Particles"));

        if(isNaN(particles)||particles<0){

            display.value="Error";
            return;

        }

        let moles = particles/AVOGADRO;

        display.value =
        "Moles = " +
        moles.toFixed(10) +
        " mol";

        lastAnswer = moles;

    }

    catch{

        display.value="Error";

    }

}
function massToParticles(){

    try{

        const AVOGADRO = 6.02214076e23;

        let formula = prompt(
        "Enter Chemical Formula");

        if(formula===null) return;

        formula = formula.trim();

        let mass = parseFloat(
        prompt("Enter Mass (g)"));

        if(isNaN(mass)||mass<=0){

            display.value="Error";
            return;

        }

        let molarMass = calculateFormulaMass(formula);

        let particles = (mass/molarMass)*AVOGADRO;

        display.value =
        "Particles = " +
        particles.toExponential(10);

        lastAnswer = particles;

    }

    catch{

        display.value="Error";

    }

}
function particlesToMass(){

    try{

        const AVOGADRO = 6.02214076e23;

        let formula = prompt(
        "Enter Chemical Formula");

        if(formula===null) return;

        formula = formula.trim();

        let particles = parseFloat(
        prompt("Enter Number of Particles"));

        if(isNaN(particles)||particles<0){

            display.value="Error";
            return;

        }

        let molarMass = calculateFormulaMass(formula);

        let mass = (particles/AVOGADRO)*molarMass;

        display.value =
        "Mass = " +
        mass.toFixed(10) +
        " g";

        lastAnswer = mass;

    }

    catch{

        display.value="Error";

    }

}
function limitingReagent(){

    try{

        let reactant1 = prompt("Reactant 1 Formula");
        if(reactant1===null) return;

        let coeff1 = parseFloat(
        prompt("Coefficient of "+reactant1));

        let mass1 = parseFloat(
        prompt("Mass of "+reactant1+" (g)"));

        let reactant2 = prompt("Reactant 2 Formula");
        if(reactant2===null) return;

        let coeff2 = parseFloat(
        prompt("Coefficient of "+reactant2));

        let mass2 = parseFloat(
        prompt("Mass of "+reactant2+" (g)"));

        if(
            isNaN(coeff1)||isNaN(coeff2)||
            isNaN(mass1)||isNaN(mass2)||
            coeff1<=0||coeff2<=0||
            mass1<=0||mass2<=0
        ){

            display.value="Error";
            return;

        }

        let moles1 =
            mass1 /
            calculateFormulaMass(reactant1);

        let moles2 =
            mass2 /
            calculateFormulaMass(reactant2);

        let ratio1 = moles1/coeff1;
        let ratio2 = moles2/coeff2;

        if(ratio1<ratio2){

            display.value =
            reactant1+
            " is Limiting Reagent";

        }

        else if(ratio2<ratio1){

            display.value =
            reactant2+
            " is Limiting Reagent";

        }

        else{

            display.value =
            "Perfect Stoichiometric Mixture";

        }

    }

    catch{

        display.value="Error";

    }

}
function theoreticalYield(){

    try{

        let reactant = prompt(
        "Limiting Reactant Formula");

        if(reactant===null) return;

        let reactantCoeff = parseFloat(
        prompt("Coefficient of Reactant"));

        let product = prompt(
        "Product Formula");

        if(product===null) return;

        let productCoeff = parseFloat(
        prompt("Coefficient of Product"));

        let reactantMass = parseFloat(
        prompt("Mass of Limiting Reactant (g)"));

        if(
            isNaN(reactantCoeff)||
            isNaN(productCoeff)||
            isNaN(reactantMass)||
            reactantCoeff<=0||
            productCoeff<=0||
            reactantMass<=0
        ){

            display.value="Error";
            return;

        }

        let reactantMoles =
            reactantMass /
            calculateFormulaMass(reactant);

        let productMoles =
            reactantMoles *
            (productCoeff/reactantCoeff);

        let productMass =
            productMoles *
            calculateFormulaMass(product);

        display.value =
        "Theoretical Yield = " +
        productMass.toFixed(10) +
        " g";

        lastAnswer = productMass;

    }

    catch{

        display.value="Error";

    }

}
function percentYield(){

    try{

        let actualYield = parseFloat(
        prompt("Enter Actual Yield (g)"));

        let theoreticalYield = parseFloat(
        prompt("Enter Theoretical Yield (g)"));

        if(
            isNaN(actualYield)||
            isNaN(theoreticalYield)||
            theoreticalYield<=0
        ){

            display.value="Error";
            return;

        }

        let percent =
        (actualYield/theoreticalYield)*100;

        display.value =
        "Percent Yield = " +
        percent.toFixed(4) +
        "%";

        lastAnswer = percent;

    }

    catch{

        display.value="Error";

    }

}
function electronConfiguration(){

    try{

        let atomicNumber = parseInt(
        prompt("Enter Atomic Number (1-118)"));

        if(
            isNaN(atomicNumber)||
            atomicNumber<1||
            atomicNumber>118
        ){

            display.value="Error";
            return;

        }

        display.value = config[atomicNumber];
    }

    catch{

        display.value="Error";

    }

}
function orbitalDiagram(){

    try{

        let atomicNumber = parseInt(
        prompt("Enter Atomic Number"));

        if(isNaN(atomicNumber) || atomicNumber<1 || atomicNumber>118){

            display.value="Error";
            return;

        }

        let elementConfig = config[atomicNumber];
        alert(elementConfig);

        if(!elementConfig){

            display.value="Configuration Not Found";
            return;

        }

        let orbitals = parseOrbitals(elementConfig);

let diagram = "";

for(let orbital in orbitals){

    diagram += orbital + " ";

    orbitals[orbital].forEach(box=>{
        diagram += "[" + box + "] ";
    });

    diagram += "\n";

}

display.value =
"Electron Configuration:\n" +
elementConfig +
"\n\nOrbital Diagram:\n" +
diagram;
    }

    catch{

        display.value="Error";

    }

}
function parseOrbitals(configuration){

    let orbitals = {};

    let parts = configuration.match(
    /(\d[spdf])(\d+)/g
    );

    if(!parts) return orbitals;


    parts.forEach(part=>{

        let orbitalName = part.slice(0,2);
        let electrons = parseInt(
        part.slice(2)
        );


        let boxes;

        if(orbitalName.includes("s"))
            boxes = 1;

        else if(orbitalName.includes("p"))
            boxes = 3;

        else if(orbitalName.includes("d"))
            boxes = 5;

        else if(orbitalName.includes("f"))
            boxes = 7;


        orbitals[orbitalName] =
        fillOrbital(boxes,electrons);

    });


    return orbitals;

}
function fillOrbital(boxes,electrons){

    let result = [];

    for(let i=0;i<boxes;i++)
        result.push("");

    // Hund's rule
    for(let i=0;i<electrons;i++){

        let index = i % boxes;

        if(result[index]=="")
            result[index]="↑";

        else
            result[index]="↑↓";

    }

    return result;

}
/*const SMART_COMMANDS = [

{
keywords:["solve","roots","equation"],

action:function(text){

    display.value=text;
    solveEquation();

    return display.value;

}
},


{
keywords:["graph","plot","draw"],

action:function(text){

    display.value=text;
    drawGraph();

    return "Graph plotted";

}
},


{
keywords:["differentiate","derivative","diff"],

action:function(text){

    display.value=text;
    symbolicDerivative();

    return display.value;

}
},


{
keywords:["integrate","integral"],

action:function(text){

    display.value=text;
    integrate();

    return display.value;

}
},


{
keywords:["simplify"],

action:function(text){

    display.value=text;
    simplifyExpression();

    return display.value;

}
},


{
keywords:["limit"],

action:function(text){

    display.value=text;
    calculateLimit();

    return display.value;

}
},


{
keywords:["taylor"],

action:function(text){

    display.value=text;
    taylorSeries();

    return display.value;

}
},


{
keywords:["newton"],

action:function(text){

    display.value=text;
    newtonSolver();

    return display.value;

}
},


{
keywords:["bisection"],

action:function(text){

    display.value=text;
    bisectionMethod();

    return display.value;

}
},


{
keywords:["molar mass"],

action:function(text){

    display.value=text;
    molecularMass();

    return display.value;

}
},


{
keywords:["electron configuration"],

action:function(text){

    display.value=text;
    electronConfiguration();

    return display.value;

}
},


{
keywords:["orbital diagram"],

action:function(text){

    display.value=text;
    orbitalDiagram();

    return display.value;

}
},


{
keywords:["periodic table"],

action:function(){

    periodicTable();

    return "Periodic table opened";

}
},


{
keywords:["chemistry"],

action:function(){

    chemistryMenu();

    return "Chemistry menu opened";

}
},


{
keywords:["matrix"],

action:function(){

    matrixMenu();

    return "Matrix menu opened";

}
},


{
keywords:["vector"],

action:function(){

    openVectorMenu();

    return "Vector menu opened";

}
},


{
keywords:["statistics"],

action:function(){

    statisticsMenu();

    return "Statistics menu opened";

}
},


{
keywords:["complex"],

action:function(){

    complexMenu();

    return "Complex menu opened";

}
},


{
keywords:["program"],

action:function(){

    programmingMenu();

    return "Programming menu opened";

}
},


{
keywords:["formula"],

action:function(){

    showFormulas();

    return "Formula menu opened";

}
},


{
keywords:["constants"],

action:function(){

    constants();

    return "Constants menu opened";

}
}

];
function executeSmartCommand(lower, command){

    for(let cmd of SMART_COMMANDS){

        for(let key of cmd.keywords){

            if(lower.startsWith(key + " ")){

                let text = command.substring(key.length + 1);

                let result = cmd.action(text);

                if(result !== undefined){

                    addHistory(
                        "SMART: " + command,
                        result
                    );

                }

                return;

            }

            if(lower === key){

                let result = cmd.action("");

                if(result !== undefined){

                    addHistory(
                        "SMART: " + command,
                        result
                    );

                }

                return;

            }

        }

    }

    display.value = "Unknown Command";

}
/*function executeSmartCommand(lower, command){

    //==========================
    // MATHEMATICS
    //==========================

    if(

    lower.startsWith("solve ") ||

    lower.startsWith("roots ") ||

    lower.startsWith("find roots ") ||

    lower.startsWith("equation ")

){

    if(lower.startsWith("solve "))
        display.value = command.substring(6);

    else if(lower.startsWith("roots "))
        display.value = command.substring(6);

    else if(lower.startsWith("find roots "))
        display.value = command.substring(11);

    else
        display.value = command.substring(9);

    solveEquation();

}

    else if(lower.startsWith("graph ")){

        display.value = command.substring(6);
        drawGraph();

    }

    else if(lower.startsWith("differentiate ")){

        display.value = command.substring(14);
        symbolicDerivative();

    }

    else if(lower.startsWith("integrate ")){

        display.value = command.substring(10);
        integrate();

    }

    else if(lower.startsWith("simplify ")){

        display.value = command.substring(9);
        simplifyExpression();

    }

    else if(lower.startsWith("limit ")){

        display.value = command.substring(6);
        calculateLimit();

    }

    else if(lower.startsWith("taylor ")){

        display.value = command.substring(7);
        taylorSeries();

    }

    else if(lower.startsWith("newton ")){

        display.value = command.substring(7);
        newtonSolver();

    }

    else if(lower.startsWith("bisection ")){

        display.value = command.substring(10);
        bisectionMethod();

    }

    //==========================
    // GRAPHS
    //==========================

    else if(lower=="trace"){

        graphTrace();

    }

    else if(lower=="tangent"){

        graphTangent();

    }

    else if(lower=="normal"){

        graphNormal();

    }

    //==========================
    // CHEMISTRY
    //==========================

    else if(lower.startsWith("molar mass ")){

        display.value = command.substring(12);
        molecularMass();

    }

    else if(lower.startsWith("electron configuration ")){

        display.value = command.substring(23);
        electronConfiguration();

    }

    else if(lower.startsWith("orbital diagram ")){

        display.value = command.substring(16);
        orbitalDiagram();

    }

    else if(lower=="periodic table"){

        periodicTable();

    }

    else if(lower=="chemistry"){

        chemistryMenu();

    }

    //==========================
    // NUMBER THEORY
    //==========================

    else if(lower=="gcd"){

        gcdCalculator();

    }

    else if(lower=="lcm"){

        lcmCalculator();

    }

    else if(lower=="prime"){

        primeTest();

    }

    else if(lower=="factorization"){

        primeFactorization();

    }

    //==========================
    // MATRIX & VECTOR
    //==========================

    else if(lower=="matrix"){

        matrixMenu();

    }

    else if(lower=="vector"){

        openVectorMenu();

    }

    //==========================
    // STATISTICS
    //==========================

    else if(lower=="statistics"){

        statisticsMenu();

    }

    //==========================
    // MODES
    //==========================

    else if(lower=="table"){

        tableMode();

    }

    else if(lower=="complex"){

        complexMenu();

    }

    else if(lower=="program"){

        programmingMenu();

    }

    //==========================
    // HELP
    //==========================

    else if(lower=="formula"){

        showFormulas();

    }

    else if(lower=="constants"){

        constants();

    }

    else{

        display.value = "Unknown Command";

    }

}
function smartCommand(){

    try{

        let command = prompt(
        "SMART COMMAND\n\nEnter a command:");

        if(command==null) return;

        command = command.trim();

        let lower = command.toLowerCase();

        executeSmartCommand(lower, command);

    }

    catch{

        display.value="Error";

    }

}*/
/*=========================================
            MEMORY FUNCTIONS
=========================================*/

function memoryClear(){

    memory = 0;
    updateMemoryIndicator();

    alert("Memory Cleared");

}

function memoryRecall(){

    display.value += memory;

}

function memoryAdd() {
    
    try {
        
        let value = Number(math.evaluate(display.value));
        
        if (isNaN(value)) {
            
            alert("Invalid value");
            
            return;
            
        }
        
        memory += value;
        
        updateMemoryIndicator();
        
        alert("Added to Memory");
        
    }
    
    catch {
        
        alert("Invalid expression");
        
    }
    
}

function memorySubtract(){

    try{

        let value = Number(math.evaluate(display.value));

        if(isNaN(value)){

            alert("Invalid value");

            return;

        }

        memory -= value;

        updateMemoryIndicator();

        alert("Subtracted from Memory");

    }

    catch{

        alert("Invalid expression");

    }

}
updateModeIndicator();
updateMemoryIndicator();

function toSuperscriptExponent(text){

    const superscripts = {
        "0":"⁰",
        "1":"¹",
        "2":"²",
        "3":"³",
        "4":"⁴",
        "5":"⁵",
        "6":"⁶",
        "7":"⁷",
        "8":"⁸",
        "9":"⁹",
        "-":"⁻",
        "+":""
    };

    return text.replace(
        /× 10\^([+-]?\d+)/,
        function(match, exponent){

            let result = "";

            for(let ch of exponent){

                result += superscripts[ch] || ch;

            }

            return "×10" + result;

        }

    );

}



async function copyFactorialResult() {
    const result = document.getElementById("factorialResultText").textContent;

    try {
        await navigator.clipboard.writeText(result);
        alert("Full factorial result copied!");
    } catch (error) {
        console.error("Could not copy factorial result:", error);
        alert("Copy failed. Please select and copy the result manually.");
    }
}


function fallbackCopy(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.readOnly = true;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "0";

    document.body.appendChild(textarea);
    textarea.select();
    textarea.setSelectionRange(0, textarea.value.length);

    try {
        const success = document.execCommand("copy");

        if (success) {
            alert("Exact factorial result copied!");
        } else {
            alert("Copy failed. Please copy the result manually.");
        }
    } catch (error) {
        console.error("Copy failed:", error);
        alert("Copy failed. Please copy the result manually.");
    } finally {
        document.body.removeChild(textarea);
    }
}

window.toggleMode = toggleMode;
window.polynomialSolver = polynomialSolver;
window.cubicSolver = cubicSolver;


