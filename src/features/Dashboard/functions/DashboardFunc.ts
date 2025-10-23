export const assignCategories = (data: any) => {
  return data.map((item: any) => {
    if (item.name.includes('KIDS') || item.name.includes('KID')) {
      return {...item, category: 'Kids'};
    } else if (item.name.includes('MASALA')) {
      return {...item, category: 'Food'};
    } else if (item.name.includes('NEWS')) {
      return {...item, category: 'News'};
    } else {
      return {...item, category: 'Entertainment'};
    }
  });
};

export const fetchLiveVideos = async (username: string, password: string) => {
  const apiUrl = `http://iptvserver1.mispl.pk:25461/get.php?username=${username}&password=${password}&type=m3u_plus&output=ts`;
  try {
    // Fetch the M3U file
    const response = await fetch(apiUrl);
    const m3uData = await response.text();
    // console.error('m3uData', m3uData);
    const lines = m3uData.split('\n');
    const channels:any = [];
    const categoryCount :any = {};
    const categorizedChannels :any = {};
  
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith("#EXTINF")) {
        const groupMatch = lines[i].match(/group-title="(.*?)"/);
        const nameMatch = lines[i].match(/tvg-name="(.*?)"/);
        const logoMatch = lines[i].match(/tvg-logo="(.*?)"/);
        const name = nameMatch ? nameMatch[1] : "Unknown";
        const logo = logoMatch ? logoMatch[1] : "Unknown";
        const category = groupMatch ? groupMatch[1] : "Uncategorized";
        
        if (lines[i + 1] && lines[i + 1].startsWith("http")) {
          const channel = { name, uri: lines[i + 1].trim(),logo };
          channels.push({ ...channel, category });
          
          categoryCount[category] = (categoryCount[category] || 0) + 1;
          if (!categorizedChannels[category]) {
            categorizedChannels[category] = [];
          }
          categorizedChannels[category].push(channel);
        }
      }
    }
  
    return { channels, categoryCount, categorizedChannels };
  } catch (error) {
    console.error('Error fetching or parsing the M3U file:', error);
  }
};
