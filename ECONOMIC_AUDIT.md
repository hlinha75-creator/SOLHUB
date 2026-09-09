# V7.4.6 Economic Audit

Validated formulas used by SOL HUB:

- Production bonus → Resource Return Rate: `RRR = bonus / (100 + bonus)`.
- Royal-city base production bonus: `18`.
- Crafting city specialty bonus: `+15`.
- Refining city specialty bonus: `+40`.
- Focus production bonus: `+59`.
- Focus Cost Efficiency: every 10,000 FCE halves the Focus cost.
- Premium market tax: `4%`; non-Premium market tax: `8%`.
- Sell Order setup fee: `2.5%` (not applied to instant sales / Black Market buy orders).
- Station usage calculation: Nutrition = `Item Value × 0.1125`, multiplied by output quantity and the station price per 100 nutrition.

Reference RRR checks:

- Royal city crafting, no specialty: 18 → 15.3%
- Royal city crafting, specialty: 33 → 24.8%
- Royal city crafting, specialty + Focus: 92 → 47.9%
- Royal city refining, specialty: 58 → 36.7%
- Royal city refining, specialty + Focus: 117 → 53.9%

V7.4.6 also enforces Black Market sales as instant sales against buy orders. A Sell Order fee must never be charged for a Black Market exit.
