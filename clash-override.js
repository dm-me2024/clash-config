const main = (config) => {
  // 替换 rule-providers 部分
  config['rule-providers'] = {
    'AD-REJECT': {
      type: 'http',
      behavior: 'domain',
      format: 'text',
      url: 'https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Advertising/Advertising_Domain.txt',
      interval: 86400
    },
    'SteamCN': {
      type: 'http',
      behavior: 'classical',
      format: 'yaml',
      url: 'https://api-gz.hosbbq.com/nus74f89st1/SC.yml',
      interval: 86400
    },
    'Bahamut': {
      type: 'http',
      behavior: 'classical',
      format: 'yaml',
      url: 'https://api-gz.hosbbq.com/nus74f89st1/Ba.yml',
      interval: 86400
    },
    'DMM': {
      type: 'http',
      behavior: 'classical',
      format: 'yaml',
      url: 'https://api-gz.hosbbq.com/nus74f89st1/DM.yml',
      interval: 86400
    },
    'ChinaMax': {
      type: 'http',
      behavior: 'classical',
      format: 'yaml',
      url: 'https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/ChinaMax/ChinaMax.yaml',
      interval: 86400
    },
    'ChinaMaxIp': {
      type: 'http',
      behavior: 'ipcidr',
      format: 'text',
      url: 'https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/ChinaMax/ChinaMax_IP_No_IPv6.txt',
      interval: 86400
    }
  };

  // 替换 rules 部分（完全保持原顺序和内容）
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

  // 替换 proxy-groups 部分（完全保持原结构、顺序和过滤逻辑）
  config['proxy-groups'] = [
    {
      name: 'PROXY',
      type: 'select',
      proxies: [
        '⚡ Auto-Fallback',
        '🔀 Load-Balance',
        '🇭🇰HK-AUTO',
        '🇨🇳TW-AUTO',
        '🇸🇬SG-AUTO',
        '🇯🇵JP-AUTO',
        '🇺🇸US-AUTO',
        '🇰🇷KR-AUTO',
        '🇨🇦CA-AUTO',
        '🇬🇧GB-AUTO',
        'OTHER-AUTO'
      ]
    },
    {
      name: '⚡ Auto-Fallback',
      type: 'fallback',
      url: 'http://www.google.com/generate_204',
      proxies: [
        '🇭🇰HK-AUTO',
        '🇨🇳TW-AUTO',
        '🇸🇬SG-AUTO',
        '🇯🇵JP-AUTO',
        '🇺🇸US-AUTO',
        '🇰🇷KR-AUTO',
        '🇨🇦CA-AUTO',
        '🇬🇧GB-AUTO',
        'OTHER-AUTO'
      ]
    },
    {
      name: '🔀 Load-Balance',
      type: 'load-balance',
      url: 'http://www.google.com/generate_204',
      interval: 600,
      strategy: 'consistent-hashing',
      proxies: [
        '🇭🇰HK-AUTO',
        '🇨🇳TW-AUTO',
        '🇸🇬SG-AUTO',
        '🇯🇵JP-AUTO',
        '🇺🇸US-AUTO',
        '🇰🇷KR-AUTO',
        '🇨🇦CA-AUTO',
        '🇬🇧GB-AUTO',
        'OTHER-AUTO'
      ]
    },
    {
      name: '🇭🇰HK-AUTO',
      type: 'url-test',
      url: 'http://www.google.com/generate_204',
      interval: 600,
      tolerance: 80,
      'include-all': true,
      filter: '^(?!.*(Traffic|Expire|过期|流量|剩余|重置|到期|套餐|\\d+\\s?(GB|TB|MB)|Days?\\s?Left)).*(?i)(hong\\s?kong|香港|hk|🇭🇰).*'
    },
    {
      name: '🇨🇳TW-AUTO',
      type: 'url-test',
      url: 'http://www.google.com/generate_204',
      interval: 600,
      tolerance: 80,
      'include-all': true,
      filter: '^(?!.*(Traffic|Expire|过期|流量|剩余|重置|到期|套餐|\\d+\\s?(GB|TB|MB)|Days?\\s?Left)).*(?i)(taiwan|台湾|tw|🇹🇼).*'
    },
    {
      name: '🇸🇬SG-AUTO',
      type: 'url-test',
      url: 'http://www.google.com/generate_204',
      interval: 600,
      tolerance: 80,
      'include-all': true,
      filter: '^(?!.*(Traffic|Expire|过期|流量|剩余|重置|到期|套餐|\\d+\\s?(GB|TB|MB)|Days?\\s?Left)).*(?i)(singapore|新加坡|狮城|sg|🇸🇬).*'
    },
    {
      name: '🇯🇵JP-AUTO',
      type: 'url-test',
      url: 'http://www.google.com/generate_204',
      interval: 600,
      tolerance: 80,
      'include-all': true,
      filter: '^(?!.*(Traffic|Expire|过期|流量|剩余|重置|到期|套餐|\\d+\\s?(GB|TB|MB)|Days?\\s?Left)).*(?i)(japan|日本|jp|🇯🇵).*'
    },
    {
      name: '🇺🇸US-AUTO',
      type: 'url-test',
      url: 'http://www.google.com/generate_204',
      interval: 600,
      tolerance: 80,
      'include-all': true,
      filter: '^(?!.*(Traffic|Expire|过期|流量|剩余|重置|到期|套餐|\\d+\\s?(GB|TB|MB)|Days?\\s?Left)).*(?i)(united\\s?states|美国|us|🇺🇸).*'
    },
    {
      name: '🇰🇷KR-AUTO',
      type: 'url-test',
      url: 'http://www.google.com/generate_204',
      interval: 600,
      tolerance: 80,
      'include-all': true,
      filter: '^(?!.*(Traffic|Expire|过期|流量|剩余|重置|到期|套餐|\\d+\\s?(GB|TB|MB)|Days?\\s?Left)).*(?i)(korea|韩国|south\\s?korea|kr|🇰🇷).*'
    },
    {
      name: '🇨🇦CA-AUTO',
      type: 'url-test',
      url: 'http://www.google.com/generate_204',
      interval: 600,
      tolerance: 80,
      'include-all': true,
      filter: '^(?!.*(Traffic|Expire|过期|流量|剩余|重置|到期|套餐|\\d+\\s?(GB|TB|MB)|Days?\\s?Left)).*(?i)(canada|加拿大|ca|🇨🇦).*'
    },
    {
      name: '🇬🇧GB-AUTO',
      type: 'url-test',
      url: 'http://www.google.com/generate_204',
      interval: 600,
      tolerance: 80,
      'include-all': true,
      filter: '^(?!.*(Traffic|Expire|过期|流量|剩余|重置|到期|套餐|\\d+\\s?(GB|TB|MB)|Days?\\s?Left)).*(?i)(great\\s?britain|britain|英国|uk|🇬🇧).*'
    },
    {
      name: 'OTHER-AUTO',
      type: 'url-test',
      url: 'http://www.google.com/generate_204',
      interval: 600,
      tolerance: 80,
      'include-all': true,
      filter: '^(?!.*(Traffic|Expire|过期|流量|剩余|重置|到期|套餐|此地區|\\d+\\s?(GB|TB|MB)|Days?\\s?Left|hong\\s?kong|香港|hk|taiwan|台湾|tw|singapore|新加坡|sg|japan|日本|jp|united\\s?states|美国|us|korea|韩国|kr|canada|加拿大|ca|britain|英国|uk|gb|🇭🇰|🇨🇳|🇹🇼|🇸🇬|🇯🇵|🇺🇸|🇰🇷|🇨🇦|🇬🇧)).*'
    }
  ];

  return config;
};
