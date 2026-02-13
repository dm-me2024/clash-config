	const main = (config) => {
	  // ================= 1. 基础配置 =================
	  // 排除流量、过期时间等干扰信息的正则
	  const excludeTraffic = '(?!.*(Traffic|Expire|过期|流量|剩余|重置|到期|套餐|\\d+\\s?(GB|TB|MB)|Days?\\s?Left))';
	  // 定义国家/地区库：包含 代理组名称后缀、旗帜符号、匹配关键词
	  // 脚本将根据此列表顺序进行匹配和排序
	  const countryDefs = [
	    { key: 'HK',  flag: '🇭🇰', keywords: 'hong\\s?kong|香港|hk|🇭🇰' },
	    { key: 'TW',  flag: '🇨🇳', keywords: 'taiwan|台湾|tw|🇹🇼' },
	    { key: 'SG',  flag: '🇸🇬', keywords: 'singapore|新加坡|狮城|sg|🇸🇬' },
	    { key: 'JP',  flag: '🇯🇵', keywords: 'japan|日本|jp|🇯🇵' },
	    { key: 'US',  flag: '🇺🇸', keywords: 'united\\s?states|美国|us|🇺🇸' },
	    { key: 'KR',  flag: '🇰🇷', keywords: 'korea|韩国|south\\s?korea|kr|🇰🇷' },
	    { key: 'CA',  flag: '🇨🇦', keywords: 'canada|加拿大|ca|🇨🇦' },
	    { key: 'GB',  flag: '🇬🇧', keywords: 'great\\s?britain|britain|英国|uk|🇬🇧' },
	    { key: 'DE',  flag: '🇩🇪', keywords: 'germany|德国|de|🇩🇪' },
	    { key: 'FR',  flag: '🇫🇷', keywords: 'france|法国|fr|🇫🇷' },
	    { key: 'AU',  flag: '🇦🇺', keywords: 'australia|澳大利亚|澳洲|au|🇦🇺' },
	    { key: 'RU',  flag: '🇷🇺', keywords: 'russia|俄罗斯|ru|🇷🇺' },
	    { key: 'NL',  flag: '🇳🇱', keywords: 'netherlands|荷兰|nl|🇳🇱' },
	    { key: 'IN',  flag: '🇮🇳', keywords: 'india|印度|in|🇮🇳' }
	  ];
	  // ================= 2. 动态检测节点 =================
	  const availableGroups = []; // 存储实际生成的代理组配置
	  const availableGroupNames = []; // 存储代理组名称，用于注入到选择列表中
	  const allKeywordsList = []; // 存储所有已定义国家的关键词，用于 OTHER 排除
	  // 遍历所有定义的国家，去节点列表中查找是否存在
	  countryDefs.forEach(country => {
	    // 构建用于 Clash 过滤器的正则字符串 (包含排除流量逻辑)
	    const filterRegex = `^${excludeTraffic}.*(?i)(${country.keywords}).*`;
	    // 构建用于 JS 检测的正则对象 (注意：JS中不需要 (?i)，而是使用 'i' 标志)
	    // 这里稍微简化一下检测逻辑：只要节点名包含关键词且不含流量信息即可
	    const detectRegex = new RegExp(`^${excludeTraffic}.*(${country.keywords}).*$`, 'i');
	    // 在 config.proxies 中查找是否有匹配的节点
	    const hasMatch = (config.proxies || []).some(p => detectRegex.test(p.name));
	    // 如果有匹配的节点，则创建该代理组
	    if (hasMatch) {
	      const groupName = `${country.flag}${country.key}-AUTO`;
	      availableGroupNames.push(groupName);
	      allKeywordsList.push(country.keywords);
	      availableGroups.push({
	        name: groupName,
	        type: 'url-test',
	        url: 'http://www.google.com/generate_204',
	        interval: 600,
	        tolerance: 80,
	        'include-all': true,
	        filter: filterRegex
	      });
	    }
	  });
	  // ================= 3. 处理 OTHER-AUTO =================
	  // 构建 OTHER 的正则：排除流量信息 且 排除所有已识别的国家关键词
	  const otherExcludeKeywords = allKeywordsList.join('|');
	  // 如果没有任何国家被识别，OTHER 就匹配所有非流量节点；否则排除已识别国家
	  const otherFilter = allKeywordsList.length > 0 
	    ? `^${excludeTraffic}.*(?i)(?!.*(${otherExcludeKeywords})).*` 
	    : `^${excludeTraffic}.*`;
	  availableGroups.push({
	    name: 'OTHER-AUTO',
	    type: 'url-test',
	    url: 'http://www.google.com/generate_204',
	    interval: 600,
	    tolerance: 80,
	    'include-all': true,
	    filter: otherFilter
	  });
	  availableGroupNames.push('OTHER-AUTO');
	  // ================= 4. 组装最终配置 =================
	  // Rule Providers (保持不变)
	  config['rule-providers'] = {
	    'AD-REJECT': {
	      type: 'http', behavior: 'domain', format: 'text',
	      url: 'https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Advertising/Advertising_Domain.txt',
	      interval: 86400
	    },
	    'SteamCN': {
	      type: 'http', behavior: 'classical', format: 'yaml',
	      url: 'https://api-gz.hosbbq.com/nus74f89st1/SC.yml',
	      interval: 86400
	    },
	    'Bahamut': {
	      type: 'http', behavior: 'classical', format: 'yaml',
	      url: 'https://api-gz.hosbbq.com/nus74f89st1/Ba.yml',
	      interval: 86400
	    },
	    'DMM': {
	      type: 'http', behavior: 'classical', format: 'yaml',
	      url: 'https://api-gz.hosbbq.com/nus74f89st1/DM.yml',
	      interval: 86400
	    },
	    'ChinaMax': {
	      type: 'http', behavior: 'classical', format: 'yaml',
	      url: 'https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/ChinaMax/ChinaMax.yaml',
	      interval: 86400
	    },
	    'ChinaMaxIp': {
	      type: 'http', behavior: 'ipcidr', format: 'text',
	      url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMax/ChinaMax_IP_No_IPv6.txt',
	      interval: 86400
	    }
	  };
	  // Rules (保持不变)
	  config.rules = [
	    'PROCESS-NAME,aria2c,DIRECT',
	    'RULE-SET,AD-REJECT,REJECT',
	    'DOMAIN-SUFFIX,local,DIRECT',
	    'IP-CIDR,127.0.0.0/8,DIRECT',
	    'IP-CIDR,172.16.0.0/12,DIRECT',
	    'IP-CIDR,192.168.0.0/16,DIRECT',
	    'IP-CIDR,10.0.0.0/8,DIRECT',
	    'IP-CIDR,17.0.0.0/8,DIRECT',
	    'IP-CIDR,100.64.0.0/10,DIRECT',
	    'IP-CIDR,224.0.0.0/4,DIRECT',
	    'IP-CIDR,203.0.113.0/24,DIRECT',
	    'IP-CIDR,192.0.2.0/24,DIRECT',
	    'IP-CIDR6,fe80::/10,DIRECT',
	    'RULE-SET,SteamCN,DIRECT',
	    'RULE-SET,ChinaMaxIp,DIRECT',
	    'RULE-SET,ChinaMax,DIRECT',
	    'RULE-SET,Bahamut,🇨🇳TW-AUTO',
	    'RULE-SET,DMM,🇯🇵JP-AUTO',
	    'GEOIP,CN,DIRECT',
	    'GEOIP,LAN,DIRECT',
	    'MATCH,PROXY'
	  ];
	  // Proxy Groups (动态生成)
	  config['proxy-groups'] = [
	    {
	      name: 'PROXY',
	      type: 'select',
	      proxies: ['⚡ Auto-Fallback', '🔀 Load-Balance', ...availableGroupNames]
	    },
	    {
	      name: '⚡ Auto-Fallback',
	      type: 'fallback',
	      url: 'http://www.google.com/generate_204',
	      proxies: [...availableGroupNames] // 按检测到的国家顺序填充
	    },
	    {
	      name: '🔀 Load-Balance',
	      type: 'load-balance',
	      url: 'http://www.google.com/generate_204',
	      interval: 600,
	      strategy: 'consistent-hashing',
	      proxies: [...availableGroupNames] // 按检测到的国家顺序填充
	    },
	    ...availableGroups // 展开所有动态生成的国家组
	  ];
	  return config;
	};
