# V7.22.10 — Discloud Craft Typecheck Fix

- Fixed the remaining production TypeScript error in Craft Calculator.
- Craft result image now uses `res.recipe.id`, which is always present when a result exists, instead of nullable `chosen.id`.
- No economic formulas or scanner logic changed.

## V7.22.9 — Discloud Production Build Fix

- Corrigidos os erros TypeScript encontrados pelo build real da Discloud.
- Removidas chaves de tradução duplicadas em `LanguageSelector.tsx`, que causavam `TS1117`.
- Corrigido o narrowing do item selecionado no Craft Calculator (`chosen` possivelmente `null`).
- Removida uma comparação de liquidez redundante/impossível no motor de recomendações do SOL (`TS2367`).
- Mantida a configuração Discloud introduzida na V7.22.8.
- Nenhuma fórmula económica, lógica de Alerts, Portfolio ou SOL Score foi alterada.

## V7.22.8 — Discloud Deployment Ready

- Adicionado `discloud.config` na raiz do projeto para deploy do SOL HUB como `TYPE=site` na Discloud.
- Adicionado `server.js` de produção para arrancar Next.js em `0.0.0.0` e respeitar automaticamente a variável `PORT` fornecida pelo hosting.
- O script `npm start` passa a usar o servidor persistente compatível com Discloud; mantido `start:next` para arranque direto do Next.js quando necessário.
- Configurado processo de build da Discloud com `npm run build`, seguindo o fluxo oficial de deploy JavaScript/Next.js da plataforma.
- Configurado `AUTORESTART=true` e 1024 MB de RAM para maior margem durante build/runtime.
- Adicionado `README_DISCLOUD.md` com instruções de upload, subdomínio, variáveis de ambiente e teste local de produção.
- Mantida compatibilidade com Vercel através do `vercel.json` existente.
- Nenhum secret ou `.env.local` é incluído no pacote.
- Nenhuma lógica económica, UI, idioma, SOL Score, Watchlist, Alerts ou Portfolio foi alterada.

# Changelog

## V7.22.7 — Result Localization & Optimizer Responsiveness

- Corrigidos textos pós-scan do **Market Scanner** para respeitarem explicitamente EN/PT-BR, incluindo Silver Plan, Best Opportunities, Data Health, risco, liquidez, qualidade, estados vazios e Opportunity Detail.
- Corrigida a área de resultados do **Craft Calculator** após `Calculate Crafting`: resumo, materiais, Return Rate, notas de Focus/mercado, labels e estados passam a usar localização explícita.
- Corrigida a área de resultados do **Refine Calculator** após `Calculate Refining`, incluindo comparação de cidades, materiais, Focus, custos, taxas, lucro e notas.
- O componente partilhado **SpecsAwareness** deixa de apresentar PT-BR com EN selecionado.
- `dataHealthLabel(...)` passa a aceitar idioma explicitamente, removendo o residual `Sem dados` em superfícies EN.
- Otimizado o **SOL Optimizer**: cada motor (Market Flips, Crafting, Refining) só executa o respetivo scan quando está selecionado. Um run apenas com Refining deixa de executar silenciosamente os scans de Flips e Crafting.
- O catálogo de produção e Daily Bonus só são carregados quando Crafting ou Refining estão ativos, reduzindo trabalho e requests desnecessários.
- Reforçada a revisão de idioma em Settings, Dashboard, Watchlist, Alerts, Portfolio e Craft Scanner nos textos residuais mais frágeis.
- Nenhuma fórmula económica, SOL Score, regra de alocação, Watchlist, Portfolio ou lógica de Alerts foi alterada.

## V7.22.6 — Item Image Identity & Language Consistency

- Reforçada a correção do **Opportunity Detail** do Market Scanner: a imagem é agora construída por um helper único a partir do `itemId` exato da oportunidade, com `itemId` também incluído na assinatura de cache e remount explícito do detalhe.
- O endpoint de imagens valida que o `itemKey` pedido corresponde ao `itemId` da rota antes de devolver conteúdo, reduzindo a possibilidade de uma resposta de cache incorreta ser associada a outro item.
- Todas as imagens dinâmicas de items no HUB foram migradas para `itemImageUrl(...)`, incluindo Dashboard, Market/Craft/Refine, SOL Optimizer, Watchlist, Alerts, Portfolio e Specializations.
- Nova assinatura de cache `v=7226` e cache upstream reduzida para 1h para eliminar respostas antigas da versão anterior sem voltar a usar fallbacks de outro item/tier.
- Corrigidos textos residuais do **SOL Optimizer** em EN: filtros, Strategy Picker, plano recomendado, métricas, cabeçalhos, estados vazios, disclaimer e footer.
- As rotas de Craft/Refine devolvidas pela API do Optimizer são agora geradas diretamente no idioma pedido (`Buy/Craft/Sell` ou `Comprar/Craftar/Vender`; `Buy/Refine/Sell` ou `Comprar/Refinar/Vender`).
- Corrigido o Refine Scanner em vários textos dinâmicos que não podiam ser traduzidos corretamente por MutationObserver devido a valores interpolados.
- Reforçada a cobertura global EN/PT-BR para footers, Daily Bonus e mensagens residuais; a página 404 também passa a respeitar a preferência de idioma.
- Nenhuma fórmula económica, SOL Score, Portfolio, Watchlist ou regra de Alerts foi alterada.

## V7.22.5 — Item Image Integrity Audit

- Corrigida a imagem do **Opportunity Detail** no Market Scanner: o proxy de imagens deixa de substituir silenciosamente um item por outra versão/tier quando o render exato falha.
- O endpoint `/api/item-image/[id]` passa a pedir exclusivamente o `itemId` recebido; se a imagem exata não estiver disponível, mostra o placeholder neutro em vez de uma imagem potencialmente incorreta.
- Adicionado cache-bust `v=7225` a todas as imagens de items para evitar que imagens incorretas guardadas pelo browser/CDN em versões anteriores continuem visíveis.
- Auditoria global das imagens em Dashboard, Market Scanner, Craft Calculator, Craft Scanner, Refine Calculator, Refine Scanner, SOL Optimizer, Watchlist, Alerts, Portfolio e Specializations.
- Confirmado que cada imagem dinâmica usa o `itemId` da mesma linha/cartão/detalhe que apresenta o nome do item.
- O helper de imagens da Dashboard passa também a codificar o `itemId` antes de construir o URL.
- Nenhuma fórmula económica, SOL Score, Alert, Portfolio ou regra de recomendação foi alterada.

## V7.22.4 — Explicit EN/PT-BR Surface Fixes

- Corrigido o botão **Find opportunities / Procurar oportunidades** no Market Scanner para respeitar explicitamente o idioma selecionado.
- Corrigido o placeholder de pesquisa do Craft Calculator em EN/PT-BR.
- A área **Best Crafting Opportunities** do Craft Scanner passou a usar labels, textos, filtros, tabela e detalhes explicitamente localizados.
- Corrigido o botão **Find Best Refines / Procurar Melhores Refinos** no Refine Scanner.
- Corrigido o botão **Make Me Silver / Faz-me Silver** do SOL Optimizer, incluindo o estado de loading.
- O Portfolio passa a traduzir também rotas antigas guardadas em PT quando são apresentadas com EN selecionado, incluindo Realized History.
- A página Specializations foi convertida para uma camada explícita EN/PT-BR em todo o conteúdo visível, filtros, Import/Export, estados e explicações.
- Os botões de motivo do Feedback Center agora são gerados diretamente no idioma ativo; Browse files e Send feedback também seguem explicitamente EN/PT-BR.
- Mantida a compatibilidade com perfis, Portfolio e dados locais já existentes.

## V7.22.3 — Hub-wide EN/PT-BR Language Audit

- Revisão global da camada de tradução EN/PT-BR, com foco nos textos que ainda apareciam em português quando EN estava selecionado.
- **Feedback Center** recebeu cobertura completa para títulos, tipos de feedback, campos, anexos, informação técnica, placeholders, estados de envio e erros locais.
- **Settings** recebeu tradução completa de configuração global, mercado, produção, interface, estados e ações.
- **Specializations** recebeu cobertura adicional para perfil, Destiny Board, filtros, árvores, descrições técnicas, import/export, Quality Points e futura integração Discord.
- Adicionada cobertura a strings comuns/dinâmicas encontradas na auditoria de Dashboard, scanners, calculators, Watchlist e SOL Optimizer.
- EN continua a ser o idioma por defeito para novos utilizadores; preferências já guardadas continuam preservadas.
- Nenhuma fórmula económica, SOL Score, Alert, Portfolio ou regra de recomendação foi alterada.

## V7.22.2 — Notification Read-on-View

- No **Notification Center**, clicar em **View in Watchlist / Ver na Watchlist** marca automaticamente apenas essa notificação como lida antes da navegação.
- O contador de notificações não lidas e o badge de Alerts passam a refletir a leitura sem exigir **Mark all read**.
- **Mark all read** continua disponível para leitura em massa.
- Nenhuma regra de alertas, SOL Intelligence ou fórmula económica foi alterada.

## V7.22.1 — Watchlist Alert Deep Link Fix

- O botão 🔔 da **Watchlist** passa a abrir diretamente o criador/editor de alerta para a oportunidade selecionada, em vez de apenas navegar para a página Alerts.
- O deep link usa o `watchlistId`, preservando exatamente a oportunidade escolhida.
- Se a oportunidade já tiver um alerta, o drawer abre em modo de edição com o tipo de alerta existente.
- Mantida a compatibilidade com EN/PT-BR e sem alterações às fórmulas económicas ou ao motor SOL Intelligence.

# SOL HUB — Changelog

Histórico consolidado das versões do projeto. Este ficheiro substitui os antigos `Vx.x.x_NOTES.md` individuais.

## V7.22.0 — SOL Performance Intelligence

- Portfolio evoluído para **SOL Performance Intelligence**, usando operações CLOSED como evidência real de desempenho.
- Nova **Forecast Accuracy** robusta por operação e agregada, comparando lucro previsto com lucro realizado sem percentagens explosivas em previsões pequenas.
- Nova **Strategy Intelligence** para FLIP, CRAFT e REFINE: lucro, win rate, ROI real e precisão das previsões.
- Nova **SOL Score Validation** por bandas 85–100, 70–84 e <70, mostrando amostra, win rate, ROI real e accuracy.
- Novas operações adicionadas ao Portfolio passam a poder guardar o SOL/Decision Score e a origem, mantendo compatibilidade total com dados antigos.
- Criados **Personal Records**: maior lucro, melhor ROI, melhor previsão, pior operação e maior win streak.
- Performance Over Time ganhou filtros 7D/30D/90D/ALL e modos Profit/ROI/Accuracy.
- Histórico realizado mostra SOL Score e Forecast Accuracy por operação.
- Nenhuma fórmula económica do Albion, taxa, Return Rate ou Focus foi alterada.

---

## V7.21.1 — Alerts Button Design Polish

- Corrigido o botão **Check Alerts Now / Verificar alertas agora** para usar o visual principal do SOL HUB.
- Corrigido o botão **Save Alert / Guardar alerta** do drawer de criação/edição para o mesmo sistema visual.
- Adicionados estados consistentes de hover, active, focus e disabled, mantendo responsividade.
- Nenhuma lógica de Alerts, Watchlist, mercado ou economia foi alterada.

---

## V7.21.0 — SOL Alerts & Radar

- Criado o novo **SOL Alerts**, acessível pela área Intelligence e com badge de notificações não lidas na sidebar.
- A Watchlist passa a permitir criar alertas para Market Flips observados.
- **SOL Smart Alert** dispara quando a oportunidade atinge SOL Score ≥ 85, rentabilidade ≥ 12% e qualidade de entrada saudável.
- **Custom Alerts** permitem definir SOL Score mínimo, rentabilidade mínima, preço máximo de compra e vantagem mínima de entrada.
- Criado **Notification Center** local com histórico de alertas disparados, estado lido/não lido e acesso à Watchlist.
- Alertas são avaliados sempre que o HUB atualiza as cotações da Watchlist ou quando o utilizador executa `Check alerts now`; não é prometido monitoramento em background com o browser fechado.
- Criado **SOL Radar** na Dashboard com oportunidades melhorando, Strong Buy, próximas do alvo, deteriorando e alertas não lidos.
- O Radar e os Alerts reutilizam o endpoint agrupado da Watchlist, evitando um pedido AODP por oportunidade.
- Nenhuma fórmula económica, taxa, Return Rate, Focus ou cálculo de lucro foi alterado.

---

## V7.20.0 — SOL Intelligence

- Introduzido o **SOL Score 2.0** para oportunidades de mercado, com score explicável de 0–100.
- O score é decomposto em **Profit, Return, Liquidity, Stability, Data Quality e Capital Efficiency**, deixando de ser apenas um número sem contexto.
- A análise histórica passa a usar separadamente o histórico da cidade de compra e o histórico da cidade de venda sem criar pedidos AODP adicionais: o mesmo batch de histórico já carregado pelo Market Scanner é reutilizado.
- Nova **Entry Quality**: compara o preço atual de compra com a média de 7 dias da própria cidade de compra.
- Nova **Trend Intelligence** com tendência 7d e estados `Potentially Undervalued`, `Fair Price`, `Potentially Overpriced`, `Rising Trend`, `Falling Trend`, `Unstable Market` e `No History`.
- O Market Scanner passa a ordenar por **SOL Score 2.0** e mostra o score, condição de mercado, qualidade da entrada e fatores detalhados no Opportunity Detail.
- O **SOL Daily Opportunity** da Dashboard passa a considerar o SOL Score 2.0 na escolha conservadora e mostra score, qualidade da entrada e tendência 7d diretamente no cartão.
- O **SOL Optimizer** ganhou um **Decision Score** para ordenar oportunidades combinando score do motor, frescura dos dados, risco e eficiência; os Market Flips mostram o SOL Score 2.0 completo ao abrir o Opportunity Detail.
- A **Watchlist Intelligence** compara o score guardado com o score atual para Market Flips e classifica a evolução como `Opportunity improved`, `stable` ou `deteriorated`.
- O score atual da Watchlist atualiza preço e frescura, preservando o contexto histórico capturado no momento em que a oportunidade foi guardada.
- As entradas novas da Watchlist guardam o snapshot de inteligência necessário para comparação futura. Entradas antigas continuam totalmente compatíveis.
- Todos os novos textos dinâmicos foram implementados explicitamente em EN/PT-BR; EN continua o idioma predefinido para novos utilizadores e preferências já guardadas continuam preservadas.
- Nenhuma taxa, fórmula de lucro, Return Rate, Focus ou regra de preço do Albion foi alterada.

---

## V7.19.4 — Safe Flip Exclusions & Watchlist Provenance

- O **SOL Daily Opportunity / Safe Flip** da Dashboard deixa de sugerir uma oportunidade que já esteja na Watchlist ou no Portfolio.
- A exclusão considera também operações do Portfolio já marcadas como `CLOSED`, evitando recomendar novamente uma rota já realizada.
- A Dashboard reage imediatamente a alterações de Watchlist/Portfolio e procura outra oportunidade elegível sem exigir reload manual.
- Adicionada origem/proveniência às entradas da Watchlist: `Market Scanner`, `SOL Optimizer`, `Dashboard`, `Craft Scanner` e `Refine Scanner`.
- A Watchlist ganhou coluna e filtro de **Source / Origem**, permitindo separar facilmente resultados vindos do Market Scanner e do SOL Optimizer.
- Entradas antigas continuam compatíveis e aparecem como `Legacy / Legado`.
- O SOL Optimizer passa a disponibilizar botão direto de **Watchlist** no plano recomendado e nas Opportunities Considered, além do Portfolio.
- O Opportunity Detail do SOL Optimizer grava as entradas na Watchlist com origem `SOL Optimizer`.
- O botão reutilizável de Watchlist foi corrigido para respeitar estritamente EN/PT-BR.
- Nenhuma fórmula económica, regra de alocação, score ou recomendação foi alterada.

---

## V7.19.3 — Dashboard Recommendation Readability

- Aumentado o cartão verde de recomendação SOL na Dashboard.
- Aumentados os textos de título, recomendação e explicação dentro do cartão.
- Melhorado o espaçamento interno e a legibilidade em desktop e mobile.
- Nenhuma lógica económica, recomendação ou tradução foi alterada.

---

## V7.19.2 — Watchlist, Optimizer & Portfolio UX Fixes

- O botão da Watchlist deixa de navegar simplesmente para o scanner e passa a abrir **Opportunity Detail** dentro da própria Watchlist.
- Flips da Watchlist carregam detalhe atual de mercado; Craft/Refine apresentam o snapshot guardado e a cotação atual disponível.
- No SOL Optimizer, `Crafting Destination`, `Refining Destination`, `Focus` e `Station Fee` passam a aparecer apenas quando as respetivas estratégias de produção estão ativas.
- Com apenas Flipping ativo, o formulário mostra apenas controlos relevantes para compra/venda entre mercados.
- A tabela principal do plano do Optimizer e `Opportunities Considered` passam ambas a abrir o mesmo Opportunity Detail ao clicar numa oportunidade.
- O botão Portfolio dentro da tabela continua independente e não abre o detalhe.
- O popup nativo do browser ao fechar uma operação no Profit Portfolio foi substituído por um modal visual do SOL HUB.
- Receita real, lucro real previsto em tempo real e notas opcionais ficam agora no mesmo modal; deixa de existir um segundo popup de notas.
- As notas continuam opcionais porque são úteis para registar venda parcial, alteração de preço ou contexto de execução, mas não bloqueiam o fechamento.
- Revalidada a alocação EN/PT-BR nas áreas alteradas, incluindo Data Health, Watchlist, detalhes, risco/liquidez e mensagens do Optimizer.
- EN continua a ser o idioma padrão para novos utilizadores.
- Nenhuma fórmula económica ou regra de alocação foi alterada.

---

## V7.19.1 — Optimizer Opportunity Clarity & Drill-down

- Reformulada a tabela **Opportunities Considered / Oportunidades consideradas** do SOL Optimizer.
- `Investimento/un.` deixa de ser a única referência de capital e passa a existir separação clara entre **Custo / un.**, **Qtd. no plano** e **Investimento no plano**.
- As oportunidades que passaram os filtros mas não foram escolhidas pelo plano mostram `—` nas colunas de quantidade e investimento, evitando sugerir que esse Silver será realmente aplicado.
- Cada oportunidade considerada passa a ser clicável.
- Flips abrem um detalhe enriquecido equivalente ao `View Opportunity` da Dashboard, com Buy/Sell, taxas, lucro, rentabilidade, risco, liquidez, volatilidade, histórico 7d, recomendação SOL e alocação real do plano.
- Craft e Refine abrem um detalhe equivalente adaptado à produção, com custo/lucro unitário, alocação do plano, Return Rate, Daily Bonus, Focus e lista de compras.
- O detalhe permite adicionar à Watchlist e ao Portfolio.
- Os textos `reason` e `focusNote` do endpoint do Optimizer passam a respeitar EN/PT-BR em vez de serem sempre devolvidos em português.
- Revalidada a cobertura de idioma do SOL Optimizer; novos utilizadores continuam com EN por defeito e preferências existentes continuam preservadas.
- Nenhuma fórmula económica, regra de alocação ou score-base foi alterado.

---

## V7.19.0 — SOL Recommendations

- Criado um motor partilhado de recomendações determinísticas em `lib/solRecommendations.ts`.
- Market Scanner passa a apresentar recomendações claras como `Good opportunity`, `Wait`, `Limit quantity`, `Watch` e `Avoid`.
- As recomendações de Market usam rentabilidade, risco, liquidez, volatilidade, desvio face à média, idade dos dados e quantidade recomendada.
- Market Intelligence recebe uma coluna `SOL` com a recomendação correspondente a cada oportunidade.
- O Opportunity Detail do Market Scanner passa a mostrar uma recomendação completa com motivo e próxima ação.
- Craft Scanner recebe recomendações `Craft now`, `Small batch` e `Wait`, usando rentabilidade, score, Daily Bonus, Focus e idade dos dados.
- Refine Scanner recebe recomendações `Refine now`, `Use Focus`, `Small batch` e `Wait`, incluindo comparação com/sem Focus.
- Craft e Refine passam a mostrar a recomendação SOL diretamente na tabela e também no respetivo detalhe.
- A Dashboard mostra agora a recomendação SOL associada ao Daily Opportunity.
- Todas as novas recomendações têm textos próprios em EN e PT-BR.
- O idioma padrão para novos utilizadores continua a ser EN.
- Nenhuma fórmula económica, taxa, rentabilidade ou score-base dos scanners foi alterado.

---

## V7.18.0 — Market Intelligence

- Adicionada uma camada **Market Intelligence** ao Market Scanner com contexto histórico de 7 dias.
- Novo **Market Pulse** apresenta boas entradas, tendências de alta, mercado aquecido, volatilidade média e alertas de risco.
- As oportunidades recebem sinais determinísticos: `Good Entry`, `Uptrend`, `Overheated`, `Downtrend`, `Balanced` e `Risky`.
- A tabela de sinais mostra tendência 7d, vantagem de entrada face à média histórica do mercado de destino, volatilidade e volume diário.
- Os sinais usam apenas dados já disponíveis no scanner/histórico AODP; nenhuma fórmula económica de lucro ou rentabilidade foi alterada.
- Aumentado o tamanho do texto de dia/mês sob as barras dos gráficos do Portfolio e dos gráficos históricos do Market Scanner.
- **EN passa a ser o idioma padrão para novos utilizadores** quando ainda não existe preferência guardada.
- Utilizadores existentes mantêm a preferência já gravada em `sol-language`.
- `DEFAULT_SETTINGS.language`, `currentSiteLanguage()` e `LanguageSelector` foram alinhados para o novo default EN.
- Auditadas as interfaces dinâmicas de Dashboard, Market Opportunity Detail, Market Intelligence, Portfolio 2.0 e Error Boundary em EN/PT-BR.
- Adicionadas traduções em falta para textos estáticos do Market Scanner e footer.
- Nenhuma fórmula económica, taxa ou cálculo de rentabilidade foi alterado.

---

## V7.17.0 — Portfolio 2.0

- Portfolio redesenhado como painel de performance do SOL HUB.
- Novos KPIs: capital em aberto, lucro esperado, lucro realizado, rentabilidade real, taxa de acerto e Silver/Focus.
- Adicionada visão `Real vs. Previsto`, melhor operação e pior operação.
- Performance separada por Market/Flip, Craft e Refine.
- Novo gráfico compacto de lucro realizado acumulado.
- Filtros por estratégia e pesquisa por item/rota.
- Tabelas de operações abertas e realizadas renovadas, mantendo o histórico existente em `notag_portfolio_v1`.
- Interface Portfolio 2.0 com textos próprios em EN e PT-BR.
- Nenhuma fórmula económica dos scanners foi alterada.

---

## V7.16.2 — Opportunity Detail EN/PT-BR

- Corrigido o **Opportunity Detail** do Market Scanner para respeitar explicitamente o idioma selecionado.
- Em `EN`, todo o painel usa labels e explicações em inglês, incluindo risco, liquidez, dados Buy/Sell, histórico, sugestão conservadora e nota AODP.
- Em `PT-BR`, o mesmo painel apresenta textos próprios em português do Brasil.
- Os nomes de qualidade no detalhe também passam a respeitar EN/PT-BR.
- A lógica de idioma do detalhe deixou de depender apenas da tradução automática do DOM, evitando textos misturados ao abrir o drawer dinamicamente.
- Corrigida ainda uma string interna da Dashboard EN (`Market intelligence online`).
- Nenhuma fórmula económica ou lógica de scan foi alterada.

---

## V7.16.1 — View Opportunity Runtime Fix

- Corrigido o crash ao clicar em **View Opportunity / Ver oportunidade** a partir da Dashboard.
- O Market Scanner renderizava `AddToPortfolioButton` no novo Opportunity Detail, mas o componente não estava importado.
- O problema só surgia quando o detalhe era aberto, por isso a validação de sintaxe não o detetava.
- Adicionado um audit específico aos componentes usados no detalhe do Market Scanner.
- Nenhuma fórmula económica ou lógica de scan foi alterada.

---

## V7.16.0 — Opportunity Details 2.0

- Market Scanner, Craft Scanner e Refine Scanner passam a ter um painel de detalhe consistente ao clicar numa oportunidade.
- Market Detail explica margem, risco, liquidez, rentabilidade, idade separada de Buy/Sell, desvio face à média e tamanho conservador recomendado.
- Craft Detail adiciona decomposição económica: materiais brutos, valor devolvido, taxa da estação, Return Rate, Daily Bonus, Focus, receita e taxas de mercado.
- Craft Scanner passa a devolver a lista de compras real por cidade, preço unitário e idade de cada material.
- Refine Detail apresenta lista de compras por cidade, Return Rate, Daily Bonus, Focus, eficiência e comparação de rentabilidade com/sem Focus.
- Todos os detalhes permitem adicionar diretamente à Watchlist e ao Portfolio.
- As linhas dos scanners Craft/Refine passam a ser clicáveis sem interferir com os botões Watchlist/Portfolio.
- Nenhuma fórmula económica foi alterada; foram expostos os componentes já usados no cálculo.

---

## V7.15.2 — Albion Data 429 Protection

- Corrigido o erro **Albion Data API 429** provocado por bursts de pedidos ao abrir oportunidades da Dashboard.
- Os pedidos de preços e histórico passam a ser feitos de forma sequencial em vez de vários pedidos simultâneos.
- Adicionado retry limitado para respostas 429 e erros temporários 5xx, respeitando `Retry-After` quando disponível.
- O histórico continua a ser apenas enriquecimento: se a API estiver temporariamente ocupada, o scanner mantém os preços disponíveis e degrada o histórico de forma segura.
- O botão **Ver oportunidade** deixa de repetir um scan global; o Market Scanner solicita apenas o item exato selecionado na Dashboard e abre o detalhe correspondente.
- Mensagens de rate limit passam a ser mais claras e respeitam EN/PT-BR no cliente.
- Nenhuma fórmula económica ou cálculo de rentabilidade foi alterado.

---

## V7.15.1 — Opportunity Deep Link, Simpler Returns & Dashboard Language

- Corrigido **Ver oportunidade**: o botão transporta agora item, qualidade e rota do SOL Pick para o Market Scanner, executa o mesmo scan e abre automaticamente o detalhe da oportunidade exata.
- Se as condições de mercado mudarem e a oportunidade já não existir, o Market Scanner informa o utilizador em vez de abrir um resultado diferente.
- A sigla **ROI** foi removida da interface e substituída por **Rentabilidade** em PT-BR e **Return** em EN, mantendo `roi` apenas como nome técnico interno.
- Dashboard passa a respeitar explicitamente o idioma guardado (`PT-BR` ou `EN`) também nos conteúdos dinâmicos do SOL Daily Opportunity.
- O pedido de nomes de items do Daily Bonus e do SOL Pick usa o idioma selecionado, preservando as traduções devolvidas pelos dados do Albion.
- Labels dinâmicas de Daily Crafting/Refining Bonus passam a ter versões próprias em PT-BR e EN.
- Nenhuma fórmula económica ou cálculo de rentabilidade foi alterado.

---

## V7.15.0 — SOL Daily Opportunity

- A Dashboard deixa de usar o bloco principal **Economic Tools** como menu de ferramentas.
- Introduzido **SOL Daily Opportunity**, que procura automaticamente um flip conservador quando a Dashboard abre.
- A seleção prioriza risco baixo, capital inicial reduzido, preços Fresh/Recent, liquidez e ROI saudável.
- O algoritmo da Dashboard é independente do score do Market Scanner e não altera a ordenação económica original do scanner.
- O scan automático usa T4–T6, enchant .0–.1, dados até 2 horas, capital de referência de 500k e um máximo preferencial de 300k de investimento recomendado.
- A oportunidade mostra item, qualidade, rota, buy/sell, investimento, lucro, ROI, volume diário, score e Market Data Health.
- Adicionado botão para guardar diretamente o SOL Pick na Watchlist.
- Quando nenhuma oportunidade cumpre os critérios conservadores, a Dashboard não força uma recomendação e encaminha para o Market Scanner.
- Os antigos atalhos principais foram substituídos por uma secção compacta **Quick Actions**.
- Nenhuma fórmula económica, cálculo de taxas, risco ou score do Market Scanner foi alterado.

---

## V7.14.1 — Watchlist Refresh Button Consistency

- Atualizado o botão **Atualizar preços** da Watchlist para usar o mesmo estilo dourado de ação principal dos restantes scanners do SOL HUB.
- Uniformizados altura, border-radius, tipografia, hover e estado disabled.
- Nenhuma lógica da Watchlist, preços ou scanners foi alterada.

---

## V7.14.0 — Watchlist & Favorites

- Criada a nova página **Watchlist** em `INTELLIGENCE`, separada do Portfolio.
- Market Scanner, Craft Scanner e Refine Scanner recebem botão ⭐ para guardar/remover oportunidades.
- Favoritos são persistidos localmente em `sol-hub-watchlist-v1`.
- A estrela reflete automaticamente o estado guardado e sincroniza entre componentes/abas.
- Watchlist inclui filtros por Market, Craft e Refine, pesquisa inteligente por item e ordenação por data, ROI, lucro ou nome.
- Adicionado endpoint `/api/watchlist/quotes` para atualizar preços de mercado das oportunidades guardadas.
- Quotes são atualizadas automaticamente ao abrir a Watchlist e também manualmente através de `Atualizar preços`.
- Market favorites mostram Buy/Sell atual; Craft e Refine mostram o preço de venda atual e preservam o snapshot económico original para comparação.
- Market Data Health é integrado na Watchlist usando a quote atual quando disponível.
- Cada favorito permite regressar rapidamente ao scanner correspondente.
- Adicionado atalho para Watchlist na Dashboard.
- Nenhuma fórmula económica dos scanners, Return Rate, Focus ou cálculo de oportunidades foi alterado.

---

## V7.13.0 — Market Data Health

- Introduzido um sistema global de **Market Data Health** com quatro estados consistentes: Fresh, Recent, Aging e Stale.
- Criado `lib/dataHealth.ts` para centralizar thresholds, labels, formatação da idade dos dados e resumos.
- Market Scanner recebe resumo global de frescura e badges consistentes por oportunidade.
- Craft Scanner passa a transportar e apresentar a idade máxima entre materiais e preço de venda.
- Refine Scanner mantém a idade já existente, agora integrada no sistema global e acompanhada por resumo de saúde.
- SOL Optimizer passa a transportar idade dos dados de FLIP, CRAFT e REFINE e apresenta essa informação no plano e nas oportunidades.
- Craft Calculator e Refine Calculator recebem um resumo da saúde dos preços usados no cálculo.
- Materiais dos calculadores passam a apresentar a idade dos respetivos preços com o mesmo sistema visual.
- Nenhuma fórmula económica, Return Rate, taxa, Focus ou regra de rentabilidade foi alterada.

---

## V7.12.12 — Client Directive Build Fix

- Corrigido o build do Next.js/Turbopack causado por um import colocado antes de `"use client"` em `Specializations`.
- Auditados todos os ficheiros TypeScript/TSX para garantir que qualquer diretiva `"use client"` é sempre a primeira expressão do ficheiro.
- Mantida integralmente a pesquisa inteligente introduzida na V7.12.11.
- Nenhuma lógica económica, pesquisa de mercado ou fórmula foi alterada.

---

## V7.12.11 — Hub-wide Smart Item Search Audit

- Auditadas as pesquisas e filtros de items em todo o SOL HUB.
- Criado `lib/itemSearch.ts` como fonte única para pesquisa inteligente por nome + tier + enchant.
- Craft Calculator mantém `Bag`, `Bag 6.1`, `Bag T6.1`, `T6.1 Bag` e aliases derivados do ID.
- Specializations passa a usar a mesma pesquisa inteligente.
- Craft Scanner e Refine Scanner recebem filtro inteligente nos resultados.
- Market Scanner, Refine Calculator e SOL Optimizer usam scans/seletores e não possuem seleção textual individual de item equivalente.
- Nenhuma fórmula económica, preço ou lógica dos scanners foi alterada.

---

## V7.12.10 — Hub-wide Item Image Audit

- Auditadas todas as referências de imagens de items no **SOL HUB**.
- O **Market Scanner** era a única ferramenta que ainda carregava imagens diretamente do Render Service no browser.
- Todas as imagens de items do Market Scanner passam agora pelo endpoint resiliente `/api/item-image/...`.
- O endpoint de imagens passa a aceitar `quality=1..5`, preservando a qualidade visual usada pelo Market Scanner.
- Craft Calculator, Refine Calculator, Craft Scanner, Refine Scanner, SOL Optimizer, Portfolio, Specializations e Dashboard já utilizavam o proxy interno e foram confirmados.
- O único acesso direto restante a `render.albiononline.com` está dentro do próprio endpoint servidor `/api/item-image`, como esperado.
- Nenhuma fórmula, scanner, preço ou lógica económica foi alterada.

---

## V7.12.9 — Craft Calculator Item Images

- Todas as imagens da **Craft Calculator** passam a usar o endpoint interno resiliente `/api/item-image/...`.
- Corrigidas as expressões regulares do fallback de imagens para reconhecer corretamente tiers e suffixes de enchantment como `@1`.
- O carregamento tenta primeiro o item exato e, se necessário, faz fallback para o item base sem enchantment.
- A pesquisa, o item selecionado e os materiais da receita deixam de depender diretamente do Render Service no browser.
- Mantém-se um SVG de fallback apenas para casos em que nenhuma imagem real esteja disponível.
- Nenhuma fórmula de crafting, mercado ou Return Rate foi alterada.

---

## V7.12.8 — Complete Bag Search Fix

- Corrigida a origem do problema que ainda escondia variantes enchanted na pesquisa da **Craft Calculator**.
- Items base com receita válida passam a incluir todas as variantes de enchantment explicitamente existentes no catálogo ao-bin, mesmo quando o nó de enchantment não repete `craftresource`.
- Pesquisar `Bag`, `Bag 6.1` ou `Bag T6.1` passa a considerar também Satchels of Insight, incluindo `T6_BAG_INSIGHT@1`.
- Adicionados aliases de categoria derivados do ID (`bag`, `bag insight`) para não depender do nome visível, por exemplo `Master's Satchel of Insight`.
- A lista `Bag` passa a incluir todas as bags craftáveis encontradas no catálogo, incluindo versões enchanted.
- Mantém-se a exclusão de items sem receita real.
- Nenhuma fórmula económica, preço de mercado ou Return Rate foi alterado.

---

## V7.12.7 — Enchanted Craft Search Fix

- Corrigida a pesquisa inteligente de items enchanted na **Craft Calculator**.
- A pesquisa passa a gerar os candidatos a partir dos IDs craftáveis reais, incluindo variantes `@1`, `@2`, `@3` e `@4`, em vez de depender apenas do mapa de nomes base.
- O nome visível das variantes enchanted é resolvido através do item base, mantendo o tier/enchant no alias de pesquisa.
- Pesquisas como `Bag 6.1`, `Bag T6.1`, `T6.1 Bag` e `Bag Tier 6.1` passam a conseguir encontrar a variante T6.1.
- Mantém-se o filtro exclusivo de items com receita real.
- Nenhuma fórmula ou cálculo económico foi alterado.

---

## V7.12.6 — Smart Craft Search

- A pesquisa da **Craft Calculator** passa a entender combinações de nome + tier + enchant.
- Exemplos suportados: `Bag 6.1`, `Bag T6.1`, `T6.1 Bag`, `Bag Tier 6.1`.
- O ranking favorece correspondências exatas e resultados que contêm todos os termos pesquisados.
- Adicionados aliases de pesquisa derivados do ID real do item, permitindo encontrar tiers/enchantments mesmo quando o nome localizado não contém `T6.1`.
- Mantém-se o filtro apenas para items realmente craftáveis.
- Atualizado o placeholder e adicionada uma dica curta de pesquisa inteligente.
- Nenhuma fórmula de crafting ou lógica económica foi alterada.

---

## V7.12.5 — Craft Calculator Item Search

- A lista de resultados da **Craft Calculator** passa a ter scroll vertical próprio e altura responsiva.
- O limite de pesquisa foi aumentado para até 100 resultados, com ranking por correspondência para colocar resultados mais relevantes primeiro.
- A pesquisa passa a mostrar apenas items com uma **receita de crafting real** no catálogo ao-bin.
- Corrigido o falso positivo `BAG` dentro de nomes/IDs como `CABBAGE`, que fazia aparecer cabbage e cabbage seeds como equipamento.
- Items sem receita suportada, como drops/loot e bags de silver, deixam de aparecer na pesquisa.
- Adicionado contador de resultados e scrollbar integrada no Visual System.
- Nenhuma fórmula de crafting, preços de mercado ou cálculo de Return Rate foi alterada.

---

## V7.12.4 — Tables & Results Overhaul

- Novo Financial Table System em Market Scanner, Craft Scanner, Refine Scanner, SOL Optimizer e Portfolio.
- Headers sticky, números tabulares, linhas compactas e melhor hierarquia de Item, Profit, ROI, Score, Risk e Liquidity.
- Badges de Data Freshness usando a idade de dados já existente, quando disponível.
- Results headers, Silver Plan, métricas, scroll horizontal e disclaimers harmonizados com o Visual Overhaul.
- Preparação visual para Market Data Health sem alterar APIs, scanners ou fórmulas económicas.

---

## V7.12.3 — Tool Naming Refresh

- Renomeado **Flipper** para **Market Scanner**.
- Renomeado **Crafting** para **Craft Calculator**.
- Renomeado **Refining** para **Refine Calculator**.
- Renomeado **Best Crafts** para **Craft Scanner**.
- Renomeado **Best Refines** para **Refine Scanner**.
- Renomeado **Optimizer** para **SOL Optimizer**.
- Renomeado **Specs** para **Specializations**.
- Atualizados Dashboard, Sidebar, títulos de páginas e metadata relevante.
- Rotas internas foram mantidas para preservar compatibilidade e bookmarks.

---

## V7.12.2 — Flipper Settings Runtime Fix

- Corrigido erro ao abrir o **Flipper** introduzido na V7.12.1.
- O Flipper importava o hook das Global Settings, mas não o inicializava no componente.
- `settings` e `settingsReady` passam agora a ser definidos corretamente através de `useSolHubSettings()`.
- Mantido todo o Visual Overhaul da V7.12.1.

---

## V7.12.1 — Visual Overhaul: Dashboard, Sidebar & Forms

- Nova linguagem visual **SOL HUB** com design system global de superfícies, borders, sombras, tipografia e accent dourado.
- Dashboard transformada num verdadeiro hub com **Economic Tools Launchpad**.
- Cards principais para Flipper, Crafting, Refining e Silver Optimizer, com hierarquia visual e microinterações.
- Atalhos secundários para Best Crafts, Best Refines, Portfolio, Specs, Settings e Feedback.
- Nova barra de estado com Albion Europe, Premium, Focus e cidade de mercado, integrada com as Global Settings.
- Sidebar 2.0 com identidade SOL HUB reforçada, active state dourado, hover mais subtil e bloco de estado Albion Europe.
- Form System 2.0 aplicado globalmente: inputs/selects mais limpos, focus states, toggles Premium, chips e botões consistentes.
- Strategy Picker, sugestões de pesquisa e Settings harmonizados com o novo design.
- Daily Bonus / Events visualmente integrados no novo sistema.
- Responsive refinado para desktop, laptop, tablet e mobile.
- Sem alterações às fórmulas económicas, APIs ou lógica dos scanners.

---

## V7.11.1 — Settings Button Consistency

- O botão **Guardar definições** passa a usar exatamente o mesmo estilo visual do botão **Repor defaults**.
- Mantida a distinção funcional entre guardar e repor; a alteração é apenas visual.

---

## V7.11.0 — Global Settings

- Nova página **Settings** na sidebar, junto às Specs.
- Preferências persistentes através de `sol-hub-settings-v1`.
- Configuração global de Premium, Focus disponível, taxa da estação, cidade de mercado, cidades/destinos de Crafting e Refining, modo de venda, idade máxima dos dados e idioma.
- Crafting Calculator passa a herdar os defaults de Crafting, Focus, estação, Premium e modo de venda.
- Refining Calculator passa a herdar cidade/destino de Refining, Focus, estação, Premium e modo de venda.
- Best Crafts e Best Refines passam a herdar as preferências globais relevantes.
- Silver Optimizer passa a usar os defaults globais de produção, Focus, frescura dos dados e Premium.
- Flipper passa a usar a cidade de mercado preferida, frescura dos dados, modo de venda e Premium.
- O seletor de idioma passa a sincronizar a preferência com as Settings.
- Os valores globais funcionam como **defaults**: continuam a poder ser alterados livremente em cada calculadora sem modificar as Settings.
- Incluído botão para repor os defaults.

---

## V7.10.0 — SOL HUB Rebrand

- O Consultor passa oficialmente a chamar-se **SOL HUB**.
- Dashboard principal atualizada para a nova identidade SOL HUB.
- Sidebar rebatizada para **SOL HUB • ALBION ECONOMY**.
- Metadados, páginas de erro, 404, Feedback Center, scanners e documentação atualizados para o novo nome.
- Nome do package atualizado para `sol-hub`.
- User-Agent interno de pedidos atualizado para SOL HUB.
- As referências **NoTag** de comunidade/exclusividade foram preservadas: SOL HUB continua a ser uma ferramenta construída para a NoTag.
- As chaves `notag-*` de localStorage existentes são mantidas por compatibilidade, evitando perder preferências dos utilizadores após o rebrand.

---

## V7.9.1 — Feedback Attachments

- O Feedback Center passa a aceitar anexos diretamente no formulário.
- Suporte para screenshots e ficheiros PNG, JPG, WEBP, GIF, PDF, TXT e LOG.
- Máximo de 3 anexos por report e 8 MB por ficheiro.
- Pré-visualização textual dos ficheiros selecionados, incluindo nome e tamanho.
- Validação no browser e novamente no endpoint server-side.
- O endpoint `/api/feedback` passa a enviar o Discord Webhook em `multipart/form-data`, incluindo Embed + anexos no mesmo report.
- Os ficheiros continuam a passar apenas pelo backend; o URL secreto do webhook permanece protegido.

---

## V7.9.0 — Feedback Center + Discord Webhook

- Nova página **Feedback** na sidebar, dentro da secção Support.
- Formulário com cinco tipos: bug, sugestão, cálculo/dados incorretos, interface e outro.
- Campos dinâmicos para contexto técnico, resultado esperado/observado e informação de mercado.
- Página afetada e contacto Discord opcional.
- Recolha opcional de versão, página de origem, idioma e browser para facilitar diagnóstico.
- Novo endpoint server-side `/api/feedback`, mantendo o URL do Discord Webhook fora do frontend.
- Reports formatados como Discord Embeds com categoria, contexto, timestamp e versão da aplicação.
- Honeypot anti-spam e validação de comprimento/campos obrigatórios.
- Configuração através da variável de ambiente `DISCORD_FEEDBACK_WEBHOOK_URL`.
- Adicionado `.env.example` com a configuração necessária.

---

## V7.8.3 — Responsive Dynamic Centering

- O conteúdo de todas as páginas passa a ser centrado dinamicamente na área útil à direita da sidebar.
- O alinhamento adapta-se automaticamente à resolução do utilizador, sem offsets fixos específicos para um monitor.
- Quando a sidebar é recolhida, o eixo central é recalculado automaticamente.
- Dashboard, Flipper, Crafting, Refining, Best Crafts, Best Refines, Optimizer, Portfolio e Specs passam a seguir o mesmo sistema global.
- Em mobile/tablet a sidebar deixa de ocupar espaço no cálculo e o conteúdo usa toda a largura disponível.
- O alinhamento interno de textos, formulários e tabelas foi preservado; foi centrada a estrutura da página, não o texto.

---

## V7.8.2 — Flipper Default Category

- O Flipper abre agora com **Todos** pré-selecionado em Tipo de item, em vez de Armaduras.
- O valor predefinido da API do Flipper também passou para `all`, mantendo UI e backend consistentes.

---

## V7.8.1 — Flipper Category Consistency

- O filtro de categorias do Flipper passou a seguir a mesma apresentação do Best Crafts.
- O campo chama-se agora **Tipo de item**.
- Ordem uniforme: Todos, Armas, Armaduras, Off-hands, Capas, Bolsas, Gathering, Comida, Poções e Montarias.
- Adicionados filtros explícitos de Gathering e Comida ao scanner do Flipper.
- Mantidas as restrições existentes do Black Market para Poções e Montarias.

---

## V7.8.0 — Refining Recipe Parser Fix

- Corrigido o erro “Esta receita de refino não tem materiais suportados.” no Refining Calculator.
- O parser de receitas passa a suportar as três estruturas de `craftresource` usadas pelos dumps ao-bin: lista, objeto único e objeto indexado (`@uniquename0`, `@count0`, etc.).
- O mesmo parser robusto foi aplicado ao Best Refines para evitar candidatos de refino descartados pela mesma razão.
- Mantidas as fórmulas de Return Rate, Focus, taxa da estação e mercado.

---

## V7.7.9 — Flipper Category & Black Market Rules

- O Flipper passou a usar categorias consistentes com Best Crafts: Todos, Armas, Armaduras, Off-hands, Capas, Bolsas, Montarias e Poções.
- Adicionado suporte explícito a Poções no scanner do Flipper.
- Black Market deixa de aparecer no seletor de venda quando Montarias ou Poções estão selecionadas.
- Se o utilizador tinha Black Market selecionado e muda para Montarias/Poções, o destino é automaticamente reposto para Todas as cidades.
- A API também bloqueia rotas de Black Market para Montarias e Poções, incluindo quando a categoria é Todos.
- Mantida a regra existente que impede comprar e vender na mesma cidade.

---

## V7.7.8 — Best Crafts Categories & Specs Readability

- Best Crafts permite filtrar por Todos, Armas, Armaduras, Off-hands, Capas, Bolsas, Gathering, Comida e Poções.
- Capas e Bolsas são categorias independentes.
- O scanner filtra os candidatos pela categoria real antes de consultar preços.
- A coluna Tipo identifica a categoria específica de cada craft.
- Aumentado novamente o texto dos blocos explicativos abaixo das Specs, mantendo o topo inalterado.
- Nenhuma alteração às fórmulas económicas.

---

## V7.7.7 — Specializations Readability

- Aumentado o tamanho do texto do bloco **Perfil Ativo** no topo da página de Especializações.
- Aumentado o tamanho do texto explicativo abaixo da tabela/árvores de Specs.
- Melhorada a legibilidade dos blocos de Qualidade e Discord no fundo da página.
- Nenhuma alteração à lógica de cálculo das especializações.

---

## V7.7.6 — Project Cleanup

- Consolidado o histórico de versões num único `CHANGELOG.md`.
- Removidos os ficheiros individuais `Vx.x.x_NOTES.md` da raiz do projeto.
- Nenhuma alteração à lógica económica, APIs, calculadoras ou interface.

---

## V7.7.5 — Specs Awareness

- Added a specialization-profile status banner to:
  - Crafting Calculator
  - Refining Calculator
  - Best Crafts
  - Best Refines
  - Silver Optimizer
- If the saved profile has no mastery/spec/FCE values above zero, the app warns that Focus results are less personalized and links directly to `/specializations`.
- Once any specialization data is configured, the warning becomes a compact green “Specs configured” indicator.
- Added PT-BR / EN translations for the new status UI.
- Verified Best Refines uses `profileRefiningFce(...)`.
- Verified Silver Optimizer uses `profileFce(...)` for Crafting and `profileRefiningFce(...)` for Refining.

---

## V7.7.4 — Security & Dependency Update

- Upgraded Next.js from 15.5.x to 16.3.4.
- Upgraded React and React DOM to 19.2.0.
- Updated React type packages and TypeScript compatibility range.
- Added Node.js >= 20.9.0 engine requirement, matching Next.js 16.
- Existing dynamic Route Handler params were already async-compatible with Next.js 16.
- No `next lint`, middleware, runtime config, AMP, or deprecated PPR configuration is used by this project.
- Production build and npm audit should be run after install to validate the local dependency tree.

---

## V7.7.3 — Optimizer Strategy Selector

- Added strategy toggles to Silver Optimizer: Flipping, Crafting and Refining.
- Any combination of the three engines can be searched.
- Selection persists in localStorage (`notag-optimizer-strategies-v1`).
- Strategy-specific filters are hidden when their engine is disabled.
- Focus controls are hidden when both Crafting and Refining are disabled.
- API results and the recommended capital allocation are filtered to enabled engines only.
- Optimizer summary cards adapt to the selected engines.
- Added PT-BR / EN translations for the new strategy selector.

---

## V7.7.2 — Header Alignment

- Language selector moved out of the sidebar and restored to the upper-right corner of every page.
- Europe server badge and UTC clock remain in the sidebar.
- All page hero headers now use the same height, spacing, title scale and text alignment.
- Dashboard and Specs no longer use visually different header dimensions.
- Mobile headers reserve their own top row for the language selector.

---

## V7.7.1
- Fixed the Specs page missing the sidebar after the specialization profile finished loading.
- The loading state already rendered AppSidebar; the normal rendered state now does too.

---

## V7.7.0 — Navigation & UI Overhaul

- Replaced the horizontal navigation with a fixed left sidebar.
- Grouped modules into Market, Production, Intelligence and Profile.
- Persistent collapsible desktop sidebar.
- Mobile drawer navigation with backdrop.
- Language selector, Europe indicator and UTC clock moved into the sidebar.
- Active page highlighting retained.
- Collapsed state persists in localStorage (`notag-sidebar-collapsed`).
- Sidebar labels support PT-BR / EN.

---

## V7.6.1

- Fixed Portfolio page English translation.
- Added EN translations for Portfolio metrics, tables, empty states and action labels.
- Portfolio close-operation prompts now follow the selected language.
- Portfolio date/time formatting now uses en-GB when English is selected and pt-PT otherwise.

---

## V7.6.0 — Profit Tracker & Portfolio

- New `/portfolio` performance tracker.
- Add recommendations directly from Silver Optimizer, Best Crafts and Best Refines.
- Open positions track capital, expected profit, ROI and Focus.
- Close a position by entering actual revenue; real profit and ROI are calculated automatically.
- Historical comparison: expected vs real profit and Silver per Focus.
- Data is stored locally in the browser under `notag_portfolio_v1`; cloud sync will come with accounts.
- Portfolio added to global navigation.

---

## V7.5.0

- New Best Refines scanner (`/best-refines`)
- Silver Optimizer 2.0: freshness filtering extended to crafting/refining and Focus-value scoring
- Best Refines uses the saved refining specialization profile, daily bonuses, station fee, Premium tax, city specialty, Focus and live Europe AODP prices
- Language selector moved immediately to the left of the Europe badge on every page
- Navigation expanded to eight economic modules
- Market prices remain dependent on Albion Online Data Project player uploads; stale/missing data is filtered where configured

---
