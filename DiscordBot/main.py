import discord
import os
from discord.ext import commands
import dotenv

client = commands.Bot(command_prefix='$', intents=discord.Intents.all())

for filename in os.listdir('./cogs'):
    if filename.endswith('.py'):
        try:
            client.load_extension(f"cogs.{filename[:-3]}")
        except Exception as e:
            print(f"Failed to load {filename}")
            print(f"[ERROR] {e}")


@client.event
async def on_ready():
    print('\nThe Virtual Stock Game Bot is Online\n')


@client.command(alias='r')
async def reload(ctx, extension):
    client.unload_extension(f'cog.{extension}')
    client.load_extension(f'cog.{extension}')
    message = 'Reload'
    await ctx.send(message)


@client.command()
async def clearos(ctx):
    os.system('cls')
    message = 'OS Clear'
    await ctx.send(message)


@client.command()
async def clear(ctx, amount: int = None):
    if amount != None:
        await ctx.channel.purge(limit=amount + 1)
    else:
        await ctx.channel.purge(11)
  
client.run(os.getenv('TOKEN'))
