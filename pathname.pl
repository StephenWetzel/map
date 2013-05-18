#!/usr/bin/perl

use strict;
use warnings;

use Cwd;

my $file; #used to access each file in the allfiles array
my @files;
my @filearray;
my $fileline;
my $inputfile = "routes.js";
my $outputfile = "output.".time.".js";
my $routename;

open(ofile, ">>$outputfile");
open(ifile, "$inputfile");
@filearray = <ifile>;
foreach $fileline (@filearray)
{
	if ($fileline =~ m/^var route/)
	{
		#var route2 = L.polyline([
		$routename = $fileline;
		chomp($routename);
		$routename =~ s/var //;
		$routename =~ s/ = L.polyline\(\[//;
	}
	if ($fileline =~ m/REPLACEROUTE/)
	{
		#],{color:'#909', smoothfactor: 10.0, clickable: true}).bindPopup(REPLACEROUTE);
		$fileline =~ s/REPLACEROUTE/"$routename"/;
	}
	print ofile ($fileline);
}



print "\nDone\n\n";
