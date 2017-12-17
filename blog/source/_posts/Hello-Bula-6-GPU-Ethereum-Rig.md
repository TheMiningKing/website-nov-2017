title: 'Hello, Bula 6 GPU Ethereum Rig'
date: 2017-12-16 19:54:16
tags:
- research
---

The _Bula_ rig officially commenced mining Ethereum at 19:27 MST. It is an analog of the [Aloha Ethereum mining rig](/blog/2017/11/09/Ethereum-Mining-Rig-Prototyping-and-Market-Investigation/).

The hardware and software are playing nice together, but hashrates are underwhelming (108 MH/S). I suspect I'll need to tinker a bit with the software.

Getting the Radeon RX580 GPUs to work with the Asus Prime 7270-A motherboard was a bit tricky. The steps I took to debug are documented here.

But first, some broad hardware/software specs...

## Hardware Specs 

- 6 Asus Radeon RX580 Dual 8GB GPUs
- Intel Core i3 7350K 4.2GHz 4MB
- Asus Prime Z270-A ATX mobo
- 4GB 2133MHz DDR4 RAM
- Intel BXTS15A Heat Sink LGA 1151
- Corsair AX2100i 1200W Digital ATX PSU
- StarTech Replacement Case Wire Kit
- Kingston UV400 SSD 2.5in 120GB
- 6 Elite PCIEx1-x16 ext USB3 Kit

Raymond and the good folk over at [Memory Express](https://www.memoryexpress.com/) in Dalhousie put the parts list together and mounted the CPU to the motherboard.

### Case hardware specs

- 20 feet of 1.25x1.25x1.25" aluminum angle bracket
- 1x2x8' spruce (I think)
- Myriad screws, washers, fasteners...

[Sign up](https://theminingking.com/#contact) to receive Mining News and I'll compile a detailed, itemized list... maybe even a 6 GPU frame blueprint too!

### The total in fiat: $4,000.35 CDN

## Software

I don't pay for software (nor do I steal it).

- Ubuntu Server 16.04.3
- Linux kernel v4.14
- AMDGPU-PRO 17.40
- `ethereum` (via `apt`)
- [ethminer](https://github.com/ethereum-mining/ethminer)

## Motherboard problems!

The Asus Z270-A motherboard caused me nothing but trouble. It turned a 20 hour job into a 30 hour job. Live and learn for next time...

Basically, I plugged in my hand-crafted bootable USB to install all the necessary software and I get messages like:

```
PCIe Bus Error severity=Corrected, type=Physical layer, id=00e0
```

Or this helpful message will flash by in the blink of an eye:

```
No suitable video mode found
Booting in blind mode Ubuntu
```

Half the time I couldn't even get into the BIOS because of some weird infighting between the GPUs and the motherboard's onboard video controller. Even getting to the `grub` menu is hit-and-miss when all 6 GPUs are connected. During software deployment, I was constantly unplugging and replugging GPUs and the monitor. Thankfully, I think I worked through most of the kinks.

For future me, be mindful of the following things...

### Some background/debugging tips

I typically attach my GPUs in waves (power off, of course). I start with one GPU (or zero) connected when first installing Ubuntu. Then, with all the system software, drivers, and dependencies installed, I attach one GPU and power up. I repeat until something breaks or I run out of slots. This is the best way to debug software and identify faulty units.

Following this approach I discovered that I can't get into the BIOS if I have all six GPUs plugged in. As such, it's best to start with one.

{% asset_img mind-the-gap.jpg "PCIEX16_1 gives no love" %}

Also, don't use the `PCIEX16_1` slot at all. Nothing seems to work in there, and I don't know why yet.

### Configure the BIOS

Getting four GPUs to work together is fairly simple. Getting all six Radeon RX580 GPUs to work with the Asus Prime 7270-A motherboard requires configuring the BIOS.

Once inside, make the following changes:

#### Update the firmware

Find _EZ Flash 3 Update_ under _Advanced -> Tools_. Choose the appropriate method and follow the prompts.

#### Enable _Above 4G Decoding_
 
It's _disabled_ by default. Go to _Advanced -> Boot_.

#### Disable _Fast Boot_

Good things take time, I guess... (_Advanced -> My Favourites_)

### Edit the default Grub stuff

With all that BIOS stuff out of the way, `grub`, our infuriating bootloader must also be configured.

Again, with one (maybe two) GPUs plugged in, open the `/etc/default/grub` file with your favourite text editor. Find the line that starts with `GRUB_CMDLINE_LINUX_DEFAULT` and make it look like this:

```
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash pci=nomsi"
```

Save and update `grub`:

```
sudo update-grub
```

Or, if that doesn't work, try:

```
GRUB_CMDLINE_LINUX_DEFAULT="quiet splash pci=noaer"
```

You'll have to run `sudo update-grub` again and reboot.

## Phew!

No one said mining is easy.

Having configured the BIOS and `grub`, start attaching RX580 GPUs to the Asus Z270-A motherboard one at a time (avoid the `PCIEX16_1` slot!!!).

Reboot between installation and use these helpful commands to debug...

### clinfo

This one comes with the RX580's `AMDGPU-PRO` drivers:

```
/opt/amdgpu-pro/bin/clinfo
```

### General Ubuntu info:

See what your GPUs look like to the OS:

```
sudo lspci -vvvv
```

This will show you any OS errors on boot:

```
dmesg | grep -i gpu
```

## Conclusion

With all six GPUs connected, I still don't get the opportunity to enter the BIOS. I don't see the `grub` menu either. The rig boots, nonetheless.

I'm pretty unhappy about the low hash rates I'm getting, but I'm glad everything's working... even if performance is degraded.

Stay tuned...

{% asset_img mining.jpg "Mining Ethereum slowly but surely" %}
