import discord
import requests
import json
from discord.ext import commands
from datetime import datetime
import os
from dotenv import load_dotenv
load_dotenv()

# history sheet sehen was man alles gekauft und verkauft hat
# neue table an legen mit buydate selldate etc

class StockGame(commands.Cog):
    def __init__(self, client):
        self.client = client

    @commands.command()
    async def createPortfolio(self, ctx):

        username = ctx.author.name
        userid = ctx.author.id

        data = {
            "username": username,
            "userid": userid,
            "date": datetime.today().strftime('%Y-%m-%d')
        }

        headers = {
            "Authorization": f'Bearer {os.getenv("bearer_key")}'
        }

        response = requests.post(
            'http://188.68.41.89:8888/user/createPortfolio', data=data, headers=headers)

        success = json.loads(response.text)['success']

        if success:
            message = 'Du hast gerade ein neues Portfolio eröffnet'
            await ctx.send(message)
        else:
            message = 'Du hast schon ein Portfolio. Du kannst nicht erneut eins Öffnen'
            await ctx.send(message)

    @commands.command()
    async def buy(self, ctx, stockticker: str, shares: int):

        username = ctx.author.name
        userid = ctx.author.id

        data = {
            "username": username,
            "userid": userid,
            "stockticker": stockticker,
            "shares": shares
        }

        headers = {
            "Authorization": f'Bearer {os.getenv("bearer_key")}'
        }

        response = requests.post(
            'http://188.68.41.89:8888/user/buy', data=data, headers=headers)

        message = json.loads(response.text)['message']

        await ctx.send(message)

    @commands.command()
    async def sell(self, ctx, stockname: str, shares: int):

        username = ctx.author.name
        userid = ctx.author.id

        data = {
            "username": username,
            "userid": userid,
            "date": datetime.today().strftime('%Y-%m-%d'),
            "stockticker": stockname,
            "sellshares": shares
        }

        headers = {
            "Authorization": f'Bearer {os.getenv("bearer_key")}'
        }

        response = requests.post(
            'http://188.68.41.89:8888/user/sell', data=data, headers=headers)

        message = json.loads(response.text)['message']

        await ctx.send(message)

    @commands.command()
    async def portfolio(self, ctx, j = None):

        userid = ctx.author.id

        headers = {
            "Authorization": f'Bearer {os.getenv("bearer_key")}'
        }

        response = requests.get(
            f'http://188.68.41.89:8888/user/portfolio/{userid}', headers=headers)

        data = json.loads(response.text)

        embed = discord.Embed(title=f'Portfolio from {ctx.author}',
                                    color=0x0000ff)

        print(data)
        if "No Stocks Found" in response.text:

            cash = data['userdata']['cash']
            portfolio = 0
            totalchange = f"{cash - 5000}|{round(cash / 5000)}"

            embed.add_field(name='Cash', value=f'`$ {cash}`')
            embed.add_field(name='Portfolio', value=f'`$ {portfolio}`')
            embed.add_field(name='Change $|%', value=f'`{totalchange}`')
            embed.add_field(name="Stock Ticker", value= data['message'])
                    
        else: 
            portfolio = data['portfolio']
            cash = data['userdata']['cash']

            totalchange = f"{data['totalChangeLT']['changeTotal']}|{data['totalChangeLT']['changePercentage']}"

            names = '\n'.join(data['userDataStock']['stocktickers'])
            prices = '\n'.join(data['userDataStock']['currentPrices'])
            shares = '\n'.join(data['userDataStock']['shares'])

            embed.add_field(name='Cash', value=f'`$ {cash}`')
            embed.add_field(name='Portfolio', value=f'`$ {portfolio}`')
            embed.add_field(name='Change $|%', value=f'`{totalchange}`')
            embed.add_field(name='Stock Ticker',
                            value=f'```{names}```', inline=True)
            embed.add_field(
                name='Shares', value=f'```{shares}```', inline=True)
            embed.add_field(name='Current Price',
                            value=f'```{prices}```', inline=True)

        await ctx.send(embed=embed)

def setup(client):
    client.add_cog(StockGame(client))
