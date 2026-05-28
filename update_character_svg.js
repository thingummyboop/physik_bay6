const fs = require('fs');
let code = fs.readFileSync('js/character_designer.js', 'utf8');

const newCode = `function characterSvg(state) {
    const group = CHARACTER_GROUPS[state.group] || CHARACTER_GROUPS.ork;
    const model = group.models[Number(state.model) % group.models.length] || group.models[0];
    const hair = visualItem(state, "hair") || {};
    const outfit = visualItem(state, "outfit") || {};
    const accessory = visualItem(state, "accessory") || {};
    const makeup = visualItem(state, "makeup") || {};
    const body = bodyMetrics(group.body);
    const outfitColor = outfit.color || "#0f766e";
    const hairColor = hair.color || model.hair;
    const accent = accessory.color || outfitColor;

    return \`
        <svg class="character-svg" viewBox="0 0 220 300" role="img" aria-label="Schulavatar">
            <defs>
                <!-- Realistic Gradients -->
                <radialGradient id="skin-gradient" cx="40%" cy="30%" r="70%">
                    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.3"/>
                    <stop offset="60%" stop-color="\${model.skin}"/>
                    <stop offset="100%" stop-color="#000000" stop-opacity="0.35"/>
                </radialGradient>
                <linearGradient id="outfit-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="\${outfitColor}"/>
                    <stop offset="40%" stop-color="\${outfitColor}"/>
                    <stop offset="100%" stop-color="#000000" stop-opacity="0.6"/>
                </linearGradient>
                <linearGradient id="leg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#111827"/>
                    <stop offset="50%" stop-color="#374151"/>
                    <stop offset="100%" stop-color="#111827"/>
                </linearGradient>
                <radialGradient id="eye-iris" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stop-color="\${outfitColor}"/>
                    <stop offset="80%" stop-color="\${outfitColor}"/>
                    <stop offset="100%" stop-color="#020617"/>
                </radialGradient>
                <filter id="drop-shadow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="2" dy="5" stdDeviation="4" flood-color="#0f172a" flood-opacity="0.4"/>
                </filter>
                <filter id="soft-shadow">
                    <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="#000000" flood-opacity="0.2"/>
                </filter>
            </defs>
            
            <!-- Floor Shadow -->
            <ellipse cx="110" cy="285" rx="75" ry="12" fill="#0f172a" opacity="0.25" filter="url(#soft-shadow)"/>
            
            <!-- Backpack Behind -->
            \${accessory.id === "acc_backpack" ? \`<rect x="\${110 - body.shoulder - 10}" y="\${body.headY + 60}" width="46" height="100" rx="18" fill="#78350f" filter="url(#drop-shadow)"/><path d="M\${110 - body.shoulder + 10} \${body.headY + 80} C\${110 - body.shoulder - 10} \${body.headY + 90}, \${110 - body.shoulder - 10} \${body.headY + 120}, \${110 - body.shoulder + 15} \${body.headY + 130}" fill="none" stroke="#92400e" stroke-width="8" stroke-linecap="round" filter="url(#soft-shadow)"/>\` : ""}
            
            <!-- Legs -->
            <path d="M\${110 - body.waist * 0.5} \${body.headY + 140} L\${110 - body.waist * 0.7} 275" stroke="url(#leg-gradient)" stroke-width="\${body.legWidth}" stroke-linecap="round" filter="url(#soft-shadow)"/>
            <path d="M\${110 + body.waist * 0.5} \${body.headY + 140} L\${110 + body.waist * 0.7} 275" stroke="url(#leg-gradient)" stroke-width="\${body.legWidth}" stroke-linecap="round" filter="url(#soft-shadow)"/>
            
            <!-- Shoes -->
            <path d="M\${110 - body.waist * 0.7 - body.legWidth} 275 h\${body.legWidth * 2 + 10} a6 6 0 0 1 0 12 h-\${body.legWidth * 2 + 10} a6 6 0 0 1 0-12z" fill="#1f2937" filter="url(#soft-shadow)"/>
            <path d="M\${110 + body.waist * 0.7 - body.legWidth + 5} 275 h\${body.legWidth * 2 + 10} a6 6 0 0 1 0 12 h-\${body.legWidth * 2 + 10} a6 6 0 0 1 0-12z" fill="#1f2937" filter="url(#soft-shadow)"/>

            <!-- Back Hair -->
            \${hair.style === "long" ? \`
                <path d="M\${110 - body.headW} \${body.headY} C\${110 - body.headW - 20} \${body.headY + 40}, \${110 - body.headW - 10} \${body.headY + 100}, \${110 - body.headW + 10} \${body.headY + 110} L110 \${body.headY + 100} L\${110 + body.headW - 10} \${body.headY + 110} C\${110 + body.headW + 10} \${body.headY + 100}, \${110 + body.headW + 20} \${body.headY + 40}, \${110 + body.headW} \${body.headY} Z" fill="\${hairColor}" filter="url(#drop-shadow)"/>
            \` : ""}

            <!-- Torso & Clothes -->
            <path d="M\${110 - body.neckW - 5} \${body.headY + 50} 
                     C\${110 - body.shoulderW} \${body.headY + 50}, \${110 - body.shoulderW - 15} \${body.headY + 70}, \${110 - body.shoulderW - 15} \${body.headY + 100}
                     L\${110 - body.waistW} 200 L\${110 + body.waistW} 200 
                     L\${110 + body.shoulderW + 15} \${body.headY + 100} 
                     C\${110 + body.shoulderW + 15} \${body.headY + 70}, \${110 + body.shoulderW} \${body.headY + 50}, \${110 + body.neckW + 5} \${body.headY + 50} Z" 
                  fill="url(#outfit-gradient)" filter="url(#drop-shadow)"/>
            
            <!-- Outfit details -->
            \${outfit.style === "overall" ? \`
                <path d="M\${110 - body.shoulderW * 0.6} \${body.headY + 55} V200 M\${110 + body.shoulderW * 0.6} \${body.headY + 55} V200 M\${110 - body.shoulderW * 0.6} \${body.headY + 100} H\${110 + body.shoulderW * 0.6}" stroke="#e0f2fe" stroke-width="6" opacity="0.6" filter="url(#soft-shadow)"/>
                <circle cx="\${110 - body.shoulderW * 0.5}" cy="\${body.headY + 75}" r="5" fill="#facc15" filter="url(#soft-shadow)"/>
                <circle cx="\${110 + body.shoulderW * 0.5}" cy="\${body.headY + 75}" r="5" fill="#facc15" filter="url(#soft-shadow)"/>
            \` : outfit.style === "jacket" ? \`
                <path d="M110 \${body.headY + 55} V200" stroke="#ffffff" stroke-width="6" opacity="0.7" filter="url(#soft-shadow)"/>
                <rect x="94" y="\${body.headY + 90}" width="32" height="40" rx="10" fill="\${accent}" opacity="0.6" filter="url(#soft-shadow)"/>
            \` : \`
                <path d="M\${110 - body.shoulderW * 0.4} \${body.headY + 70} Q110 \${body.headY + 90} \${110 + body.shoulderW * 0.4} \${body.headY + 70}" fill="none" stroke="#ffffff" stroke-width="6" opacity="0.6" filter="url(#soft-shadow)"/>
            \`}

            <!-- Arms -->
            <path d="M\${110 - body.shoulderW - 5} \${body.headY + 60} Q\${110 - body.shoulderW - 25} \${body.headY + 120} \${110 - body.shoulderW - 10} \${body.headY + 160}" fill="none" stroke="url(#skin-gradient)" stroke-width="18" stroke-linecap="round" filter="url(#drop-shadow)"/>
            <path d="M\${110 + body.shoulderW + 5} \${body.headY + 60} Q\${110 + body.shoulderW + 25} \${body.headY + 120} \${110 + body.shoulderW + 10} \${body.headY + 160}" fill="none" stroke="url(#skin-gradient)" stroke-width="18" stroke-linecap="round" filter="url(#drop-shadow)"/>
            
            <!-- Hands -->
            <circle cx="\${110 - body.shoulderW - 10}" cy="\${body.headY + 160}" r="10" fill="url(#skin-gradient)" filter="url(#soft-shadow)"/>
            <circle cx="\${110 + body.shoulderW + 10}" cy="\${body.headY + 160}" r="10" fill="url(#skin-gradient)" filter="url(#soft-shadow)"/>

            \${heldAccessory(accessory, accent, body)}
            \${groupExtrasBehind(state.group, model)}
            
            <!-- Neck shadow & Neck -->
            <path d="M\${110 - body.neckW} \${body.headY + 20} L\${110 - body.neckW} \${body.headY + 60} L\${110 + body.neckW} \${body.headY + 60} L\${110 + body.neckW} \${body.headY + 20} Z" fill="url(#skin-gradient)" filter="url(#drop-shadow)"/>
            <path d="M\${110 - body.neckW} \${body.headY + 20} Q110 \${body.headY + 40} \${110 + body.neckW} \${body.headY + 20} L\${110 + body.neckW} \${body.headY + 60} L\${110 - body.neckW} \${body.headY + 60} Z" fill="#000000" opacity="0.2"/>

            <!-- Head Base (Realistic Egg Shape) -->
            <path d="M\${110 - body.headW} \${body.headY - 10} 
                     C\${110 - body.headW} \${body.headY - 45}, \${110 + body.headW} \${body.headY - 45}, \${110 + body.headW} \${body.headY - 10} 
                     C\${110 + body.headW} \${body.headY + 25}, \${110 + body.headW * 0.6} \${body.headY + body.headH}, 110 \${body.headY + body.headH} 
                     C\${110 - body.headW * 0.6} \${body.headY + body.headH}, \${110 - body.headW} \${body.headY + 25}, \${110 - body.headW} \${body.headY - 10} Z" 
                  fill="url(#skin-gradient)" filter="url(#drop-shadow)"/>
            
            \${earSvg(state.group, model, body)}
            \${realisticHairFrontSvg(hair.style || "short", hairColor, state.group, body)}
            \${faceSvg(state, model, makeup, body)}
            \${groupExtrasFront(state.group, model)}
            \${accessoryOnFace(accessory, accent, body)}
        </svg>
    \`;
}

function bodyMetrics(body) {
    const base = { headW: 28, headH: 35, shoulderW: 45, waistW: 30, neckW: 14, headY: 75, legWidth: 16 };
    const map = {
        power: { ...base, headW: 30, headH: 38, shoulderW: 55, waistW: 40, neckW: 18, legWidth: 20 },
        compact: { ...base, headW: 32, headH: 35, shoulderW: 48, waistW: 45, neckW: 16, headY: 90, legWidth: 22 },
        slim: { ...base, shoulderW: 36, waistW: 24, neckW: 10, legWidth: 12 },
        clever: { ...base },
        nature: { ...base, shoulderW: 46, waistW: 35, legWidth: 18 }
    };
    return map[body] || map.clever;
}

function realisticHairFrontSvg(style, color, groupId, metrics) {
    const hw = metrics.headW;
    const hy = metrics.headY;
    const twig = groupId === "druide" ? \`<path d="M\${110 - hw * 0.6} \${hy - 40}l-12-19M\${110 + hw * 0.6} \${hy - 38}l15-20" stroke="#365314" stroke-width="5" stroke-linecap="round" filter="url(#soft-shadow)"/><circle cx="\${110 - hw * 0.6 - 14}" cy="\${hy - 60}" r="6" fill="#84cc16" filter="url(#soft-shadow)"/><circle cx="\${110 + hw * 0.6 + 17}" cy="\${hy - 58}" r="6" fill="#84cc16" filter="url(#soft-shadow)"/>\` : "";
    const highlight = \`<path d="M\${110 - hw * 0.6} \${hy - 30} Q110 \${hy - 40} \${110 + hw * 0.6} \${hy - 30}" fill="none" stroke="#ffffff" stroke-width="4" opacity="0.15" stroke-linecap="round"/>\`;
    
    let base = "";
    if (style === "long" || style === "short" || style === "streak") {
        base = \`
            <path d="M\${110 - hw} \${hy - 10} C\${110 - hw - 10} \${hy - 50}, \${110 + hw + 10} \${hy - 50}, \${110 + hw} \${hy - 10}
                     C110 \${hy - 30}, 110 \${hy - 30}, \${110 - hw} \${hy - 10} Z" fill="\${color}" filter="url(#drop-shadow)"/>
            <path d="M110 \${hy - 30} Q\${110 - hw} \${hy}, \${110 - hw - 15} \${hy + 30} Q110 \${hy - 10}, 110 \${hy - 30} Z" fill="\${color}" filter="url(#drop-shadow)"/>
            <path d="M110 \${hy - 30} Q\${110 + hw} \${hy}, \${110 + hw + 15} \${hy + 30} Q110 \${hy - 10}, 110 \${hy - 30} Z" fill="\${color}" filter="url(#drop-shadow)"/>
        \`;
        if (style === "streak") {
            base += \`<path d="M100 \${hy - 35} Q\${110 + hw * 0.5} \${hy - 10}, \${110 + hw + 10} \${hy + 10}" fill="none" stroke="#fff7ed" stroke-width="6" stroke-linecap="round" filter="url(#soft-shadow)"/>\`;
        }
    } else if (style === "curls") {
        base = \`
            <circle cx="110" cy="\${hy - 40}" r="\${hw * 0.7}" fill="\${color}" filter="url(#drop-shadow)"/>
            <circle cx="\${110 - hw * 0.6}" cy="\${hy - 25}" r="\${hw * 0.6}" fill="\${color}" filter="url(#drop-shadow)"/>
            <circle cx="\${110 + hw * 0.6}" cy="\${hy - 25}" r="\${hw * 0.6}" fill="\${color}" filter="url(#drop-shadow)"/>
            <circle cx="\${110 - hw * 0.8}" cy="\${hy - 5}" r="\${hw * 0.5}" fill="\${color}" filter="url(#drop-shadow)"/>
            <circle cx="\${110 + hw * 0.8}" cy="\${hy - 5}" r="\${hw * 0.5}" fill="\${color}" filter="url(#drop-shadow)"/>
        \`;
    } else if (style === "bun") {
        base = \`
            <circle cx="110" cy="\${hy - 50}" r="\${hw * 0.6}" fill="\${color}" filter="url(#drop-shadow)"/>
            <path d="M\${110 - hw} \${hy - 10} C\${110 - hw - 5} \${hy - 45}, \${110 + hw + 5} \${hy - 45}, \${110 + hw} \${hy - 10}
                     C110 \${hy - 20}, 110 \${hy - 20}, \${110 - hw} \${hy - 10} Z" fill="\${color}" filter="url(#drop-shadow)"/>
        \`;
    }
    return twig + base + highlight;
}

function earSvg(groupId, model, body) {
    const hw = body.headW;
    const hy = body.headY;
    if (groupId === "elf") {
        return \`<path d="M\${110 - hw + 2} \${hy - 5} L\${110 - hw - 20} \${hy - 25} L\${110 - hw} \${hy + 15} Z" fill="url(#skin-gradient)" filter="url(#drop-shadow)"/><path d="M\${110 + hw - 2} \${hy - 5} L\${110 + hw + 20} \${hy - 25} L\${110 + hw} \${hy + 15} Z" fill="url(#skin-gradient)" filter="url(#drop-shadow)"/><path d="M\${110 - hw} \${hy} L\${110 - hw - 12} \${hy - 15} L\${110 - hw} \${hy + 5}" fill="none" stroke="#000" stroke-width="1.5" opacity="0.2"/><path d="M\${110 + hw} \${hy} L\${110 + hw + 12} \${hy - 15} L\${110 + hw} \${hy + 5}" fill="none" stroke="#000" stroke-width="1.5" opacity="0.2"/>\`;
    }
    if (groupId === "ork") {
        return \`<path d="M\${110 - hw + 2} \${hy} L\${110 - hw - 15} \${hy - 5} L\${110 - hw} \${hy + 20} Z" fill="url(#skin-gradient)" filter="url(#drop-shadow)"/><path d="M\${110 + hw - 2} \${hy} L\${110 + hw + 15} \${hy - 5} L\${110 + hw} \${hy + 20} Z" fill="url(#skin-gradient)" filter="url(#drop-shadow)"/>\`;
    }
    return \`<ellipse cx="\${110 - hw}" cy="\${hy + 5}" rx="5" ry="9" fill="url(#skin-gradient)" filter="url(#soft-shadow)"/><ellipse cx="\${110 + hw}" cy="\${hy + 5}" rx="5" ry="9" fill="url(#skin-gradient)" filter="url(#soft-shadow)"/><path d="M\${110 - hw + 2} \${hy + 2} Q\${110 - hw - 3} \${hy + 5} \${110 - hw + 2} \${hy + 8}" fill="none" stroke="#000" stroke-width="1.5" opacity="0.2"/><path d="M\${110 + hw - 2} \${hy + 2} Q\${110 + hw + 3} \${hy + 5} \${110 + hw - 2} \${hy + 8}" fill="none" stroke="#000" stroke-width="1.5" opacity="0.2"/>\`;
}

function faceSvg(state, model, makeup, body) {
    const hy = body.headY;
    const hw = body.headW;
    const ew = hw * 0.3; // eye width
    const eh = 5; // eye height
    const ex1 = 110 - hw * 0.45;
    const ex2 = 110 + hw * 0.45;
    const ey = hy - 2;

    const lashes = state.gender === "female" ? \`
        <path d="M\${ex1 - ew} \${ey} C\${ex1} \${ey - eh - 4}, \${ex1 + ew} \${ey}, \${ex1 + ew} \${ey}" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
        <path d="M\${ex2 - ew} \${ey} C\${ex2} \${ey - eh - 4}, \${ex2 + ew} \${ey}, \${ex2 + ew} \${ey}" fill="none" stroke="#000" stroke-width="2.5" stroke-linecap="round"/>
    \` : "";

    const brows = \`
        <path d="M\${ex1 - ew - 2} \${ey - 8} Q\${ex1} \${ey - 12} \${ex1 + ew + 2} \${ey - 8}" fill="none" stroke="#1f2937" stroke-width="3" stroke-linecap="round" filter="url(#soft-shadow)"/>
        <path d="M\${ex2 - ew - 2} \${ey - 8} Q\${ex2} \${ey - 12} \${ex2 + ew + 2} \${ey - 8}" fill="none" stroke="#1f2937" stroke-width="3" stroke-linecap="round" filter="url(#soft-shadow)"/>
    \`;

    const nose = \`
        <path d="M110 \${ey} Q110 \${hy + 12} 107 \${hy + 16} Q110 \${hy + 20} 113 \${hy + 16}" fill="none" stroke="#000" stroke-width="1.5" opacity="0.3" stroke-linecap="round"/>
        <path d="M105 \${hy + 14} Q110 \${hy + 20} 115 \${hy + 14}" fill="none" stroke="#000" stroke-width="2" opacity="0.2" stroke-linecap="round"/>
    \`;

    const lipColor = state.gender === "female" ? "#ec4899" : "#a16207";
    const lipOpacity = state.gender === "female" ? "0.6" : "0.3";
    const mouthY = hy + 28;
    const mouth = \`
        <path d="M102 \${mouthY} Q110 \${mouthY + 4} 118 \${mouthY}" fill="none" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
        <path d="M103 \${mouthY} Q110 \${mouthY - 4} 117 \${mouthY} Q110 \${mouthY + 5} 103 \${mouthY} Z" fill="\${lipColor}" opacity="\${lipOpacity}"/>
    \`;
    
    const freckles = makeup.style === "freckles" ? \`<g fill="\${model.cheek}" opacity="0.8"><circle cx="\${110 - hw * 0.5}" cy="\${ey + 10}" r="2.5"/><circle cx="\${110 - hw * 0.3}" cy="\${ey + 12}" r="2"/><circle cx="\${110 + hw * 0.3}" cy="\${ey + 12}" r="2"/><circle cx="\${110 + hw * 0.5}" cy="\${ey + 10}" r="2.5"/></g>\` : "";
    const star = makeup.style === "star" ? \`<path d="M\${110 + hw * 0.6} \${ey + 10}l3.5 7 8 1-6 6 1.5 8-7-3.5-7 3.5 1.5-8-6-6 8-1z" fill="#facc15" stroke="#ca8a04" stroke-width="1.5" filter="url(#soft-shadow)" transform="scale(0.6) translate(\${(110 + hw * 0.6)*0.66}, \${(ey + 10)*0.66})"/>\` : "";
    const choco = makeup.style === "choco" ? \`<path d="M\${110 - hw * 0.7} \${mouthY + 2} Q\${110 - hw * 0.4} \${mouthY + 12} 110 \${mouthY + 5}" fill="none" stroke="#7c2d12" stroke-width="6" stroke-linecap="round" opacity="0.85"/>\` : "";
    
    return \`
        <!-- Eye Whites -->
        <path d="M\${ex1 - ew} \${ey} C\${ex1} \${ey - eh}, \${ex1 + ew} \${ey}, \${ex1 + ew} \${ey} C\${ex1} \${ey + eh}, \${ex1 - ew} \${ey}, \${ex1 - ew} \${ey} Z" fill="#fff" filter="url(#soft-shadow)"/>
        <path d="M\${ex2 - ew} \${ey} C\${ex2} \${ey - eh}, \${ex2 + ew} \${ey}, \${ex2 + ew} \${ey} C\${ex2} \${ey + eh}, \${ex2 - ew} \${ey}, \${ex2 - ew} \${ey} Z" fill="#fff" filter="url(#soft-shadow)"/>
        
        <!-- Iris & Pupil -->
        <circle cx="\${ex1}" cy="\${ey}" r="\${eh}" fill="url(#eye-iris)"/>
        <circle cx="\${ex1}" cy="\${ey}" r="\${eh * 0.4}" fill="#000"/>
        <circle cx="\${ex2}" cy="\${ey}" r="\${eh}" fill="url(#eye-iris)"/>
        <circle cx="\${ex2}" cy="\${ey}" r="\${eh * 0.4}" fill="#000"/>
        
        <!-- Highlights -->
        <circle cx="\${ex1 - 1.5}" cy="\${ey - 1.5}" r="1.5" fill="#fff" opacity="0.9"/>
        <circle cx="\${ex2 - 1.5}" cy="\${ey - 1.5}" r="1.5" fill="#fff" opacity="0.9"/>
        
        \${lashes}
        \${brows}
        \${nose}
        \${mouth}
        
        <!-- Blush -->
        <ellipse cx="\${110 - hw * 0.6}" cy="\${ey + 12}" rx="8" ry="5" fill="\${model.cheek}" opacity="0.5" filter="url(#soft-shadow)"/>
        <ellipse cx="\${110 + hw * 0.6}" cy="\${ey + 12}" rx="8" ry="5" fill="\${model.cheek}" opacity="0.5" filter="url(#soft-shadow)"/>
        
        \${freckles}\${star}\${choco}
    \`;
}

function groupExtrasBehind(groupId, model) {
    return "";
}

function groupExtrasFront(groupId, model) {
    if (groupId === "ork") return \`<path d="M85 85l18-6M135 85l-18-6" stroke="#111827" stroke-width="5" stroke-linecap="round" filter="url(#soft-shadow)"/>\`;
    if (groupId === "druide") return \`<path d="M125 105q12 12 22 2" stroke="#451a03" stroke-width="6" stroke-linecap="round" opacity="0.8" filter="url(#soft-shadow)"/>\`;
    if (groupId === "zwerg") return \`<ellipse cx="85" cy="85" rx="4" ry="5" fill="#78350f" filter="url(#soft-shadow)"/><ellipse cx="135" cy="85" rx="4" ry="5" fill="#78350f" filter="url(#soft-shadow)"/>\`;
    return "";
}

function heldAccessory(accessory, accent, body) {
    if (accessory.id === "acc_none" || accessory.id === "acc_backpack" || accessory.id === "acc_glasses" || accessory.id === "acc_headphones") return "";
    return \`<g transform="translate(\${110 + body.shoulderW + 10} 130)" filter="url(#soft-shadow)"><rect x="-15" y="-18" width="30" height="34" rx="8" fill="\${accent}" stroke="#102a27" stroke-width="3"/><text x="0" y="5" text-anchor="middle" font-size="12" font-weight="900" fill="#fff">\${accessory.icon || "A"}</text></g>\`;
}

function accessoryOnFace(accessory, accent, body) {
    const hy = body.headY;
    if (accessory.id === "acc_glasses") return \`<circle cx="96" cy="\${hy - 2}" r="12" fill="none" stroke="#111827" stroke-width="3" filter="url(#soft-shadow)"/><circle cx="124" cy="\${hy - 2}" r="12" fill="none" stroke="#111827" stroke-width="3" filter="url(#soft-shadow)"/><path d="M108 \${hy - 2}h4" stroke="#111827" stroke-width="3" filter="url(#soft-shadow)"/>\`;
    if (accessory.id === "acc_headphones") return \`<path d="M\${110 - body.headW - 5} \${hy - 2} Q110 \${hy - 45} \${110 + body.headW + 5} \${hy - 2}" fill="none" stroke="#111827" stroke-width="6" filter="url(#soft-shadow)"/><rect x="\${110 - body.headW - 10}" y="\${hy - 10}" width="14" height="28" rx="6" fill="\${accent}" filter="url(#soft-shadow)"/><rect x="\${110 + body.headW - 4}" y="\${hy - 10}" width="14" height="28" rx="6" fill="\${accent}" filter="url(#soft-shadow)"/>\`;
    return "";
}

function miniPortraitSvg(groupId, index) {
    const group = CHARACTER_GROUPS[groupId] || CHARACTER_GROUPS.ork;
    const model = group.models[index % group.models.length];
    return \`
        <svg viewBox="0 0 64 64" aria-hidden="true" focusable="false">
            <defs>
                <radialGradient id="mini-skin-\${index}" cx="40%" cy="40%" r="70%">
                    <stop offset="0%" stop-color="#ffffff" stop-opacity="0.2"/>
                    <stop offset="50%" stop-color="\${model.skin}"/>
                    <stop offset="100%" stop-color="#000000" stop-opacity="0.3"/>
                </radialGradient>
                <filter id="mini-shadow"><feDropShadow dx="1" dy="2" stdDeviation="1" flood-opacity="0.3"/></filter>
            </defs>
            <circle cx="32" cy="24" r="16" fill="url(#mini-skin-\${index})" filter="url(#mini-shadow)"/>
            \${groupId === "elf" ? \`<path d="M18 25L3 15l12 20M46 25l15-10-12 20" fill="url(#mini-skin-\${index})" filter="url(#mini-shadow)"/>\` : ""}
            \${groupId === "ork" ? \`<path d="M18 26L6 20l10 14M46 26l12-6-10 14" fill="url(#mini-skin-\${index})" filter="url(#mini-shadow)"/>\` : ""}
            <path d="M16 24 Q19 4 33 6 Q48 8 48 26 Q33 14 16 24Z" fill="\${model.hair}" filter="url(#mini-shadow)"/>
            
            <path d="M22 23 C22 20, 28 20, 28 23 C28 26, 22 26, 22 23 Z" fill="#ffffff"/><circle cx="25" cy="23" r="1.5" fill="#111827"/>
            <path d="M36 23 C36 20, 42 20, 42 23 C42 26, 36 26, 36 23 Z" fill="#ffffff"/><circle cx="39" cy="23" r="1.5" fill="#111827"/>
            
            <path d="M27 34q5 5 10 0" fill="none" stroke="#1f2937" stroke-width="2" stroke-linecap="round"/>
            <path d="M16 46 Q32 36 48 46 L52 64H12Z" fill="#0f766e" filter="url(#mini-shadow)"/>
            \${groupId === "druide" ? \`<path d="M27 6l-8-10M39 7l10-9" stroke="#365314" stroke-width="4"/><circle cx="19" cy="-4" r="4" fill="#84cc16"/>\` : ""}
            \${groupId === "zauberer" ? \`<circle cx="26" cy="24" r="5" fill="none" stroke="#eab308" stroke-width="2"/><circle cx="38" cy="24" r="5" fill="none" stroke="#eab308" stroke-width="2"/>\` : ""}
        </svg>
    \`;
}

// Hidden Feature: Principal (Direktor)
function secretDirektorSvg(metal) {
    const m = {
        gold: { base: "#fbbf24", dark: "#b45309", light: "#fef08a", robe: "#451a03", accent: "#f59e0b" },
        silber: { base: "#94a3b8", dark: "#334155", light: "#f8fafc", robe: "#0f172a", accent: "#cbd5e1" },
        kupfer: { base: "#d97706", dark: "#78350f", light: "#fcd34d", robe: "#2e1065", accent: "#b45309" }
    };
    const c = m[metal] || m.gold;
    return \`
        <svg class="character-svg" viewBox="0 0 220 300" role="img" aria-label="Geheimer Direktor">
            <defs>
                <linearGradient id="dir-robe" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="\${c.robe}"/>
                    <stop offset="100%" stop-color="#000"/>
                </linearGradient>
                <radialGradient id="dir-metal" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stop-color="\${c.light}"/>
                    <stop offset="40%" stop-color="\${c.base}"/>
                    <stop offset="100%" stop-color="\${c.dark}"/>
                </radialGradient>
                <filter id="dir-shadow">
                    <feDropShadow dx="0" dy="5" stdDeviation="4" flood-color="#000" flood-opacity="0.4"/>
                </filter>
            </defs>
            <ellipse cx="110" cy="285" rx="75" ry="12" fill="#0f172a" opacity="0.25"/>
            <!-- Robe -->
            <path d="M 60 120 C 30 150, 20 200, 10 300 L 210 300 C 200 200, 190 150, 160 120 C 130 100, 90 100, 60 120 Z" fill="url(#dir-robe)" filter="url(#dir-shadow)"/>
            <!-- Robe Accents -->
            <path d="M 110 130 L 90 300 L 130 300 Z" fill="\${c.accent}" opacity="0.3"/>
            <!-- Metal Head (Neutral, abstract/funny shape) -->
            <path d="M 110 130 C 60 130, 60 60, 110 60 C 160 60, 160 130, 110 130 Z" fill="url(#dir-metal)" filter="url(#dir-shadow)"/>
            <!-- Big Metal Nose -->
            <ellipse cx="110" cy="100" rx="15" ry="10" fill="url(#dir-metal)" filter="url(#dir-shadow)"/>
            <!-- Big Mustache -->
            <path d="M 80 110 Q 110 100 140 110 Q 150 120 145 125 Q 110 115 75 125 Q 70 120 80 110 Z" fill="\${c.light}" filter="url(#dir-shadow)"/>
            <!-- Stern Eyes -->
            <path d="M 85 85 L 105 90 L 105 85 Z" fill="#000"/>
            <path d="M 135 85 L 115 90 L 115 85 Z" fill="#000"/>
            <circle cx="95" cy="92" r="3" fill="#000"/>
            <circle cx="125" cy="92" r="3" fill="#000"/>
            <!-- Monocle -->
            <circle cx="125" cy="92" r="10" fill="none" stroke="\${c.light}" stroke-width="2" filter="url(#dir-shadow)"/>
            <path d="M 133 100 Q 140 120 135 150" fill="none" stroke="\${c.light}" stroke-width="1.5"/>
            <!-- Graduation Cap -->
            <path d="M 110 20 L 160 40 L 110 60 L 60 40 Z" fill="#111827" filter="url(#dir-shadow)"/>
            <path d="M 80 48 L 80 65 C 80 70, 140 70, 140 65 L 140 48 Z" fill="#1f2937"/>
            <!-- Tassel -->
            <path d="M 110 40 Q 150 40 155 60 L 155 75" fill="none" stroke="\${c.accent}" stroke-width="2"/>
            <path d="M 152 75 L 158 75 L 156 85 L 154 85 Z" fill="\${c.accent}"/>
        </svg>
    \`;
}
`
